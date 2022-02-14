import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Switch,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import LoadingButton from "../Components/LoadingButton";
import React, { useEffect } from "react";
import * as chains from "../constants/chains";
import COINS from "../constants/coins";

import {
  getAccount,
  getFactory,
  getProvider,
  getRouter,
  getSigner,
  getNetwork,
  getAmountOut,
  getBalanceAndSymbol,
  getWeth,
  swapTokens,
  getReserves,
  getEpsStaking
} from "../ethereumFunctions";


const styles = (theme) => ({
  paperContainer: {
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  rowClaimAll: {
    backgroundColor: theme.palette.action.hover,
    borderBottom: "3px solid #ccc"
  }
});

const useStyles = makeStyles(styles);

export default function Rewards() {
  const classes = useStyles();
  const [provider, setProvider] = React.useState(getProvider());
  const [signer, setSigner] = React.useState(getSigner(provider));

  // The following are populated in a react hook
  const [account, setAccount] = React.useState(undefined);
  const [chainId, setChainId] = React.useState(undefined);
  const [router, setRouter] = React.useState(undefined);
  const [stakingEps, setStakingEps] = React.useState(undefined);
  const [weth, setWeth] = React.useState(undefined);
  const [panic, setPanic] = React.useState(undefined);
  const [factory, setFactory] = React.useState(undefined);

  // Stores a record of whether their respective dialog window is open
  const [dialog1Open, setDialog1Open] = React.useState(false);
  const [dialog2Open, setDialog2Open] = React.useState(false);
  const [wrongNetworkOpen, setwrongNetworkOpen] = React.useState(false);

  const [tokenDetails, setTokenDetails] = React.useState({
    address: undefined,
    symbol: undefined,
    balance: undefined,
  });

  const [panicBalance, setPanicBalance] = React.useState("0");

  const [coins, setCoins] = React.useState([]);

  // Stores the current value of their respective text box
  const [field1Value, setField1Value] = React.useState("");
  const [field2Value, setField2Value] = React.useState("");

  // Controls the loading button
  const [loading, setLoading] = React.useState(false);


  // These functions take an HTML event, pull the data out and puts it into a state variable.
  const handleChange = {
    field1: (e) => {
      setField1Value(e.target.value);
    },
    field2: (e) => {
      setField2Value(e.target.value);
    },
  };


  // This hook will run when the component first mounts, it can be useful to put logs to populate variables here
  useEffect(() => {

    getAccount().then((account) => {
      setAccount(account);
    });

    async function Network() {
      const chainId = await getNetwork(provider).then((chainId) => {
        setChainId(chainId);
        return chainId;
      });
      if (chains.networks.includes(chainId)) {
        setwrongNetworkOpen(false);
        console.log('chainID: ', chainId);
        // Get the router using the chainID
        const router = await getRouter(chains.routerAddress.get(chainId), signer);
        const stakingEps = await getEpsStaking("0x066Da5249e1312E95d63F7A54CB039aE36510A6E",signer);
        setRouter(router);
        setStakingEps(stakingEps);
        setPanic(getWeth("0xA882CeAC81B22FC2bEF8E1A82e823e3E9603310B",signer));
        // Get Weth address from router
        await router.weth().then((wethAddress) => {
          console.log('Weth: ', wethAddress);
          setWeth(getWeth(wethAddress, signer));
          // Set the value of the weth address in the default coins array
          const coins = COINS.get(chainId);
          coins[0].address = wethAddress;
          setCoins(coins);
        });
        // Get the factory address from the router
        await router.factory().then((factory_address) => {
          setFactory(getFactory(factory_address, signer));
        })
      } else {
        console.log('Wrong network mate.');
        setwrongNetworkOpen(true);
      }
    }

    Network()

  }, []);

  
  async function exit(){
    await stakingEps;
    await panic;
    //const amountIn = ethers.utils.parseUnits(bal, 18);
    //await panic.approve("0x066Da5249e1312E95d63F7A54CB039aE36510A6E","999999999999999999999999");
    await stakingEps.exit();
  }

  return (
    <div>
      <Container>
        <Paper className={classes.paperContainer}>
          <Typography variant="h5" className={classes.title}>
            PANIC Rewards
          </Typography>

          <section>
            <Typography variant="h6" className={classes.title}>
              For Farmers:
            </Typography>
            <ul>
              <li>
                PANIC rewards are subject to a 2 year vesting period, but can also be claimed early at a 50% penalty.
              </li>
              <li>
                Exiting before the end of the vesting period always incurs a 50% penalty no matter how early or late you choose to exit.
              </li>
              <li>
                The 50% penalty is distributed continuously to PANIC lockers rewarding the long-term holders.
              </li>
            </ul>
          </section>


          <section>
            <Typography variant="h6" className={classes.title}>
              For PANIC lockers:
            </Typography>
            <ul>
              <li>
                Lock dates are grouped by the week. Any lock between Monday to Sunday is grouped in the same week group, and will release at the same time 2 years later.
              </li>
              <li>
                Locked PANIC is subject to a mandatory 2 years lock and cannot be unlocked early.
              </li>
              <li>
                PANIC rewards from locking PANIC can be claimed anytime with no penalty.
              </li>
            </ul>
          </section>



          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Claim</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {/* Unlocked PANIC */}
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1">
                      Unlocked PANIC
                    </Typography>
                    Staked PANIC and cleared PANIC vests
                  </TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">
                    <LoadingButton
                      loading={false}
                      valid={true}
                      success={false}
                      fail={false}
                      onClick={() => { }}
                    >
                      Claim
                    </LoadingButton>
                  </TableCell>
                </TableRow>


                {/* PANIC Stake and Lock Rewards */}
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1">
                      PANIC Stake and Lock Rewards
                    </Typography>
                  </TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">
                    <LoadingButton
                      loading={false}
                      valid={true}
                      success={false}
                      fail={false}
                      onClick={() => { }}
                    >
                      Claim
                    </LoadingButton>
                  </TableCell>
                </TableRow>


                {/* Vesting PANIC */}
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1">
                      Vesting PANIC
                    </Typography>
                    PANIC that can be claimed with a 50% penalty
                  </TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">
                    <LoadingButton
                      loading={false}
                      valid={true}
                      success={false}
                      fail={false}
                      onClick={() => { }}
                    >
                      Claim
                    </LoadingButton>
                  </TableCell>
                </TableRow>


                {/* Claim all above */}
                <TableRow className={classes.rowClaimAll} >
                  <TableCell component="th" scope="row">
                    Claim all above
                  </TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">
                    <LoadingButton
                      loading={false}
                      valid={true}
                      success={false}
                      fail={false}
                      onClick={() => { exit() }}
                    >
                      Claim
                    </LoadingButton>
                  </TableCell>
                </TableRow>


                {/* Unlocked PANIC */}
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1">
                      Unlocked PANIC
                    </Typography>
                    PANIC that was previosuly locked for 2 years
                  </TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">
                    <LoadingButton
                      loading={false}
                      valid={true}
                      success={false}
                      fail={false}
                      onClick={() => { }}
                    >
                      Claim
                    </LoadingButton>
                  </TableCell>
                </TableRow>

              </TableBody >
            </Table >
          </TableContainer >


        </Paper >


      </Container >


      <Container>
        <Paper className={classes.paperContainer}>

          <Typography variant="h5" className={classes.title}>
            Vesting PANIC
          </Typography>

          <TableContainer>
            <Table className={classes.table} size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell>Early exit penalty</TableCell>
                  <TableCell>Expiry</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {/* @todo */}
                {/* @todo --> need to iterate with myArray.map()  */}
                {/* @todo */}
                <TableRow>
                  <TableCell>
                    xxx
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Thu May 12 2022</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    xxx
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Thu May 12 2022</TableCell>
                </TableRow>

              </TableBody >
            </Table >
          </TableContainer >

          <br />

          <Typography variant="body1">
            Total PANIC vesting: xxx
          </Typography>

          <Typography variant="body1">
            Total value: $ xxx
          </Typography>

        </Paper>
      </Container >


      <Container>
        <Paper className={classes.paperContainer}>

          <Typography variant="h5" className={classes.title}>
            Your locked PANIC
          </Typography>

          <TableContainer>
            <Table className={classes.table} size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell>Expiry</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {/* @todo */}
                {/* @todo --> need to iterate with myArray.map()  */}
                {/* @todo */}
                <TableRow>
                  <TableCell>
                    xxx
                  </TableCell>
                  <TableCell>Thu May 12 2022</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    xxx
                  </TableCell>
                  <TableCell>Thu May 12 2022</TableCell>
                </TableRow>

              </TableBody >
            </Table >
          </TableContainer >

          <br />

          <Typography variant="body1">
            Total PANIC locked: xxx
          </Typography>

          <Typography variant="body1">
            Total value: $ xxx
          </Typography>

        </Paper>
      </Container >


    </div >
  );
}


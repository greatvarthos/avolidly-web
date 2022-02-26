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
import {ethers} from 'ethers';
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
  },
  smallTokenIcon: {
    width: "20px",
    marginLeft: "5px",
    marginRight: "5px",
    marginBottom: "2px",
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
  const [vestedBalance, setVestedBalance] = React.useState(0);
  const [unlockedBalance, setUnlockedBalance] = React.useState(0);
  const [panicRewards, setPanicRewards] = React.useState(0);
  const [yvWFTMRewards, setYvWFTMRewards] = React.useState(0);

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
      const chainId = await getNetwork(provider);
      setChainId(chainId);
      if (chains.networks.includes(chainId)) {
        setwrongNetworkOpen(false);
        console.log('chainID: ', chainId);
        // Get the router using the chainID
        const router = await getRouter(chains.routerAddress.get(chainId), signer);
        const stakingEps = await getEpsStaking(chains.epsStakingAddress.get(chainId),signer);
        setRouter(router);
        setStakingEps(stakingEps);
        setPanic(getWeth(chains.tokenAddress.get(chainId),signer));
        // Get Weth address from router
        await router.wftm().then((wethAddress) => {
          console.log('Weth: ', wethAddress);
          setWeth(getWeth(wethAddress, signer));
          // Set the value of the weth address in the default coins array
          const coins = COINS.get(chainId);
          //coins[0].address = wethAddress;
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

  useEffect( async() => {
    if(stakingEps){
      await Promise.all([
        stakingEps.unlockedBalance(account),
        stakingEps.withdrawableBalance(account),
        stakingEps.claimableRewards(account)
      ]).then((values) => {
        console.log(values);
        setUnlockedBalance(ethers.utils.formatUnits(values[0]));
        setVestedBalance(ethers.utils.formatUnits(values[1]['penaltyAmount']*2));

        setPanicRewards(ethers.utils.formatUnits(values[2][0][1]));
        setYvWFTMRewards(0);
      });
      /*
      const [ unlockedBal, { 1: penaltyData }, [{ 1: panicEarned}, { 1: yvWFTMEarned}]] = await Promise.all([
        stakingEps.unlockedBalance(account),
        stakingEps.withdrawableBalance(account),
        stakingEps.claimableRewards(account)
      ]);
      setVestedBalance(ethers.utils.formatUnits(penaltyData)*2);
      setUnlockedBalance(ethers.utils.formatUnits(unlockedBal));
      setPanicRewards(ethers.utils.formatUnits(panicEarned));
      setYvWFTMRewards(ethers.utils.formatUnits(yvWFTMEarned));

       */
    }
  }, [panic]);

  
  async function exit(){
    await stakingEps;
    await stakingEps.exit();
  }
  
  async function getReward(){
    await stakingEps;
    await stakingEps.getReward();
  }
  
  async function withdrawUnlocked(){
    await stakingEps;
    const amount = await stakingEps.unlockedBalance(account);
    //await panic.approve("0x536b88CC4Aa42450aaB021738bf22D63DDC7303e","999999999999999999999999");
    await stakingEps.withdraw(amount);
  }

  return (
    <div>


<Container>
        <Paper className={classes.paperContainer}>
          <section>
            <Typography variant="h6" className={classes.title}>
              Staking
            </Typography>
            <p>Avolidly at its core is a fork of the audited Solidly code-base from Andre Cronje. Our swap user interface, as a result, will be familiar to users throughout DeFi. This AMM supports not only both stable and non-stable pairs, but also multi-hop swaps (even those that include stable and non-stable pairs mixed routes) within a very intuitive contract interface. In addition we designed a farming incentives system which features very strong tokenomics.</p>
            <p>Shout out to PanicSwap to paving much of the way for us. We'll be taking it from here however.</p>
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

                {/* Unlocked AVLD */}
                <TableRow>
                  <TableCell component="th" scope="row">
                    Staked AVLD
                  </TableCell>
                  <TableCell align="center">
                    {Number(unlockedBalance).toFixed(6)}                    
                    <img src="assets/token/AVLD.svg" className={classes.smallTokenIcon}></img>
                  </TableCell>
                  <TableCell align="center">
                    <LoadingButton
                      loading={false}
                      valid={true}
                      success={false}
                      fail={false}
                      onClick={() => { withdrawUnlocked() }}
                    >
                      Unstake
                    </LoadingButton>
                  </TableCell>
                </TableRow>


                {/* AVLD Stake and Lock Rewards */}
                <TableRow>
                  <TableCell component="th" scope="row">
                      AVLD Rewards
                  </TableCell>
                  <TableCell align="center">
                    {Number(panicRewards).toFixed(2) }
                    <img src="assets/token/AVLD.svg" className={classes.smallTokenIcon}></img>
                     AVLD
                    <hr/>
                    {Number(yvWFTMRewards).toFixed(2)}
                    <img src="assets/token/WAVAX.svg" className={classes.smallTokenIcon}></img>
                     WAVAX
                  </TableCell>
                  <TableCell align="center">
                    <LoadingButton
                      loading={false}
                      valid={true}
                      success={false}
                      fail={false}
                      onClick={() => { getReward() }}
                    >
                      Claim
                    </LoadingButton>
                  </TableCell>
                </TableRow>
                {/* Claim all above */}
                <TableRow className={classes.rowClaimAll} >
                  <TableCell component="th" scope="row">
                    Exit vesting
                  </TableCell>
                  <TableCell align="center">
                  {Number(vestedBalance/2).toFixed(6)}
                  <img src="assets/token/AVLD.svg" className={classes.smallTokenIcon}></img>
                  </TableCell>
                  <TableCell align="center">
                    <LoadingButton
                      loading={false}
                      valid={true}
                      success={false}
                      fail={false}
                      onClick={() => { exit() }}
                    >
                      Exit
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              </TableBody >
            </Table >
          </TableContainer >


        </Paper >


      </Container >

    </div >
  );
}


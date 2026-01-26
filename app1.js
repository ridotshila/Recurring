import {
  Lucid,
  Blockfrost,
  Constr,
  Data
} from "https://unpkg.com/lucid-cardano@0.10.11/web/mod.js";

/* =====================================================
   DATUM SCHEMA (MUST MATCH HASKELL)
===================================================== */

const RecurringDatum = Data.Object({
  rdPayer: Data.Bytes(),
  rdRecipient: Data.Bytes(),
  rdAmount: Data.Integer(),
  rdInterval: Data.Integer(),
  rdNextPayment: Data.Integer(),
});

/* =====================================================
   CONFIG
===================================================== */

const BLOCKFROST_URL = "https://cardano-preprod.blockfrost.io/api/v0";
const BLOCKFROST_KEY = "preprodYjRkHfcazNkL0xxG9C2RdUbUoTrG7wip";
const NETWORK = "Preprod";

/* =====================================================
   PLUTUS SCRIPT (PASTE YOUR CBOR HERE)
===================================================== */

const SCRIPT_CBOR = "590f61010000323232323322332232323232323233223232323232323233223232323232323233322232323232323232323232323233223232223223232533532323232533500315335323235002222222222222533533355301e12001502025335333573466e3c0380041181144d40d4004540d0010841184110d401488888015400440dc4cd5ce2481096e6f7420706179657200036153355335323232350022235002223500522350022253335333502400b00600215335001153350051333502200b00300710411333502200b00300710411333502200b003007355003222222222222005335015335016350303500522222001038335019502f0381233333333001017225335333573466e1c0080040e80e4408054cd4ccd5cd19b8900200103a039101e101f22333573466e200080040e80e488ccd5cd19b8900200103a03922333573466e240080040e40e888ccd5cd19b8800200103903a225335333573466e240080040e80e440044008894cd4ccd5cd19b8900200103a039100210011037133573892109746f6f206561726c7900036153355335333573466e20c8c0d4004ccd54c0304800488cd54c044480048d400488cd540fc008cd54c050480048d400488cd54108008ccd40048cc1152000001223304600200123304500148000004cd54c044480048d400488cd540fc008ccd40048cd54c054480048d400488cd5410c008d5405c00400488ccd5540480600080048cd54c054480048d400488cd5410c008d54058004004ccd55403404c00800540e4c8c8d4004888888888888ccd54c0684800488d40088888d401088cd400894cd4ccd5cd19b8f01700104e04d133504f00600810082008504700a5002350042222200435004222220030360371037133573892112726563697069656e74206e6f7420706169640003615335533553353500222350022222222222223333500d250342503425034233355301f1200150212350012253355335333573466e3cd400888008d4010880081241204ccd5cd19b873500222001350042200104904810481350380031503700d213500122350012222350092235002222222222222333553021120012235002222253353501822350062232335005233500425335333573466e3c0080041641605400c416081608cd4010816094cd4ccd5cd19b8f0020010590581500310581533500321533500221335002233500223350022335002233036002001205b2335002205b23303600200122205b222335004205b2225335333573466e1c01800c17817454cd4ccd5cd19b8700500205e05d13303d004001105d105d10561533500121056105613350530060051005504e00a1326320323357389201024c660003310362215335001153335350022222002103821333573466e1cd4c08400488888004cdc01a803911110009a8039111100101d01c9081c91081d081b899ab9c490112646174756d206e6f7420616476616e6365640003610361036135001220023333573466e1cd55cea80224000466442466002006004646464646464646464646464646666ae68cdc39aab9d500c480008cccccccccccc88888888888848cccccccccccc00403403002c02802402001c01801401000c008cd40b00b4d5d0a80619a8160169aba1500b33502c02e35742a014666aa060eb940bcd5d0a804999aa8183ae502f35742a01066a05806e6ae85401cccd540c00e1d69aba150063232323333573466e1cd55cea80124000466a04a6464646666ae68cdc39aab9d5002480008cd40a8cd4109d69aba150023045357426ae8940088c98c811ccd5ce02382402289aab9e5001137540026ae854008c8c8c8cccd5cd19b8735573aa0049000119a81699a8213ad35742a004608a6ae84d5d1280111931902399ab9c047048045135573ca00226ea8004d5d09aba2500223263204333573808608808226aae7940044dd50009aba1500533502c75c6ae854010ccd540c00d08004d5d0a801999aa8183ae200135742a004606c6ae84d5d1280111931901f99ab9c03f04003d135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d55cf280089baa00135742a008604c6ae84d5d1280211931901899ab9c03103202f3333573466e1d40152002212200223333573466e1d40192000212200123263203133573806206405e05c603400c205e2c26aae7940044dd500089aab9d3754002222444666aa600824002a06066aa600e2400246a0024466aa06a0046aa012002666aa600824002446a00444a66a666aa6018240026466a02044666a006440040040026a00244002246600244a66a004206c200206646a002446601400400a00c2006266a068008006a06200266aa600e2400246a002446466aa06c006600200a640026aa07044a66a00226aa0140064426a00444a66a6601800401022444660040140082600c006004640026aa0624422444a66a00220044426600a004666aa600e2400200a0080022242444600600822424446002008640026aa05c442244a66a0022a05c44266a05e600800466aa600c24002008002640026aa05a4422444a66a00226a00644002442666a00a440046008004666aa600e2400200a00800244666ae68cdc7801000814013899a80091299a801108018800a80989109198008018010910919800801801091091980080180111199ab9a3370e00400204604424446a004446a00644a666a666a01200e0080042a66a0062002204e204c204e2442466002006004244464646464a666a00c42a666a00c42a666a0104260089309801a4c2a666a00e4260089309801a4c201a20162a666a00e4260089309801a4c2a666a00c4260089309801a4c20182a666a00a42014201620122a666a00a42a666a00e42600a930980224c2a666a00c42600a930980224c201820142a666a00c42600a930980224c2a666a00a42600a930980224c20164a666a00a42a666a00e42a666a00e42666a0160140040022c2c2c20162a666a00c42a666a00c42666a0140120040022c2c2c201420124a666a00842a666a00c42a666a00c42666a0140120040022c2c2c20142a666a00a42a666a00a42666a0120100040022c2c2c201220104a666a00642a666a00a42a666a00a42666a0120100040022c2c2c20122a666a00842a666a00842666a01000e0040022c2c2c2010200e4a666a00442a666a00842a666a00842666a01000e0040022c2c2c20102a666a00642a666a00642666a00e00c0040022c2c2c200e200c246a0024444444400e244400624440042444002464646464646666ae68cdc39aab9d5005480008ccccc8888848ccccc00401801401000c008dd71aba15005375c6ae854010dd69aba15003375a6ae854008dd69aba135744a004464c6403666ae7006c0700644d5d1280089aba25001135744a00226aae7940044dd50008919118011bac0013200135501f2233335573e0024a03c466a03a60086ae84008c00cd5d100100b919191999ab9a3370e6aae7540092000233221233001003002300c35742a004600a6ae84d5d1280111931900b19ab9c016017014135573ca00226ea80048c8c8c8c8cccd5cd19b8735573aa00890001199991110919998008028020018011919191999ab9a3370e6aae7540092000233221233001003002301535742a00466a01a0286ae84d5d1280111931900d99ab9c01b01c019135573ca00226ea8004d5d0a802199aa8043ae500735742a0066464646666ae68cdc3a800a4008464244460040086ae84d55cf280191999ab9a3370ea0049001119091118008021bae357426aae7940108cccd5cd19b875003480008488800c8c98c8074cd5ce00e80f00d80d00c89aab9d5001137540026ae854008cd4025d71aba135744a004464c6402e66ae7005c0600544d5d1280089aba25001135573ca00226ea80044cd54005d73ad112232230023756002640026aa03844646666aae7c008940708cd406ccd54074c018d55cea80118029aab9e500230043574400602a26ae84004488c8c8cccd5cd19b875001480008d401cc014d5d09aab9e500323333573466e1d400920022500723263201433573802802a02402226aae7540044dd50008909118010018891000919191999ab9a3370ea002900311909111180200298039aba135573ca00646666ae68cdc3a8012400846424444600400a60126ae84d55cf280211999ab9a3370ea006900111909111180080298039aba135573ca00a46666ae68cdc3a8022400046424444600600a6eb8d5d09aab9e500623263201233573802402602001e01c01a26aae7540044dd5000919191999ab9a3370e6aae7540092000233221233001003002300535742a0046eb4d5d09aba2500223263200e33573801c01e01826aae7940044dd50009191999ab9a3370e6aae75400520002375c6ae84d55cf280111931900619ab9c00c00d00a13754002464646464646666ae68cdc3a800a401842444444400646666ae68cdc3a8012401442444444400846666ae68cdc3a801a40104664424444444660020120106eb8d5d0a8029bad357426ae8940148cccd5cd19b875004480188cc8848888888cc008024020dd71aba15007375c6ae84d5d1280391999ab9a3370ea00a900211991091111111980300480418061aba15009375c6ae84d5d1280491999ab9a3370ea00c900111909111111180380418069aba135573ca01646666ae68cdc3a803a400046424444444600a010601c6ae84d55cf280611931900a99ab9c01501601301201101000f00e00d135573aa00826aae79400c4d55cf280109aab9e5001137540024646464646666ae68cdc3a800a4004466644424466600200a0080066eb4d5d0a8021bad35742a0066eb4d5d09aba2500323333573466e1d4009200023212230020033008357426aae7940188c98c8038cd5ce00700780600589aab9d5003135744a00226aae7940044dd5000919191999ab9a3370ea002900111909118008019bae357426aae79400c8cccd5cd19b875002480008c8488c00800cdd71aba135573ca008464c6401666ae7002c0300240204d55cea80089baa00112232323333573466e1d400520042500623333573466e1d400920022350083006357426aae7940108cccd5cd19b87500348000848880088c98c8030cd5ce00600680500480409aab9d5001137540022424446006008224440024646666ae68cdc3a800a4004401446666ae68cdc3a801240004014464c6400c66ae7001801c01000c4d55ce9baa001499240103505431001200132001355009223350014800088d4008894cd4ccd5cd19b8f00200d009008130070011300600332001355008223350014800088d4008894cd4ccd5cd19b8f00200c00800710011300600312200212200111220021221223300100400311221233001003002488100223370000400222464600200244660066004004003";

const script = {
  type: "PlutusV2",
  script: SCRIPT_CBOR,
};

/* =====================================================
   GLOBAL STATE
===================================================== */

let lucid;
let walletAddress;
let scriptAddress;

/* =====================================================
   INIT
===================================================== */

async function init() {
  try {
    // Check if wallet is available
    if (!window.cardano || !window.cardano.lace) {
      log("Error: Please install Lace wallet first");
      return;
    }

    log("Connecting wallet...");

    lucid = await Lucid.new(
      new Blockfrost(BLOCKFROST_URL, BLOCKFROST_KEY),
      NETWORK
    );

    const api = await window.cardano.lace.enable();
    lucid.selectWallet(api);

    walletAddress = await lucid.wallet.address();
    scriptAddress = lucid.utils.validatorToAddress(script);

    console.log("Wallet:", walletAddress);
    console.log("Script:", scriptAddress);

    // Update UI with wallet info
    updateWalletUI();
    log("Wallet connected successfully");
    
  } catch (error) {
    console.error("Init error:", error);
    log(`Error: ${error.message}`);
  }
}

/* =====================================================
   UPDATE WALLET UI
===================================================== */

async function updateWalletUI() {
  try {
    // Update wallet address display
    const walletDisplay = document.getElementById("walletAddress");
    if (walletDisplay) {
      const shortAddress = walletAddress.substring(0, 8) + "..." + walletAddress.substring(walletAddress.length - 8);
      walletDisplay.textContent = shortAddress;
    }

    // Update balance
    const balanceDisplay = document.getElementById("balance");
    if (balanceDisplay && lucid) {
      const balance = await lucid.wallet.getBalance();
      const adaBalance = Number(balance) / 1_000_000;
      balanceDisplay.textContent = `${adaBalance.toFixed(2)} ADA`;
    }

    // Update status
    updateStatus(true);
    
  } catch (error) {
    console.error("UI update error:", error);
  }
}

/* =====================================================
   UPDATE STATUS
===================================================== */

function updateStatus(connected) {
  const statusDot = document.getElementById("statusDot");
  const statusText = document.getElementById("statusText");
  
  if (statusDot && statusText) {
    if (connected) {
      statusDot.classList.add("active");
      statusText.textContent = "Connected";
      statusDot.style.background = "#2ed573";
    } else {
      statusDot.classList.remove("active");
      statusText.textContent = "Disconnected";
      statusDot.style.background = "#ff4757";
    }
  }
}

/* =====================================================
   DATUM / REDEEMER
===================================================== */

function mkRecurringDatum(payer, recipient, amount, intervalSeconds, nextPayment) {
  return Data.to(
    {
      rdPayer: payer,
      rdRecipient: recipient,
      rdAmount: BigInt(amount),
      rdInterval: BigInt(intervalSeconds),
      rdNextPayment: BigInt(nextPayment),
    },
    RecurringDatum
  );
}

// Redeemers
const payRedeemer = Data.to(new Constr(0, [])); // Pay
const cancelRedeemer = Data.to(new Constr(1, [])); // Cancel

/* =====================================================
   CREATE RECURRING PAYMENT
===================================================== */

async function createRecurringPayment() {
  try {
    if (!lucid || !walletAddress) {
      log("Error: Please connect wallet first");
      return;
    }

    const recipientAddr = document.getElementById("recipient").value.trim();
    const amountInput = document.getElementById("amount").value.trim();
    const intervalInput = document.getElementById("interval").value.trim();

    // Basic validation
    if (!recipientAddr || !amountInput || !intervalInput) {
      log("Error: Please fill in all fields");
      return;
    }

    if (!recipientAddr.startsWith("addr")) {
      log("Error: Invalid Cardano address");
      return;
    }

    const amountAda = BigInt(Number(amountInput) * 1_000_000);
    const intervalDays = BigInt(intervalInput);

    if (amountAda <= 0n) {
      log("Error: Amount must be greater than 0");
      return;
    }

    if (intervalDays <= 0n) {
      log("Error: Interval must be greater than 0 days");
      return;
    }

    const payerPkh = lucid.utils.getAddressDetails(walletAddress).paymentCredential.hash;

    let recipientPkh;
    try {
      recipientPkh = lucid.utils.getAddressDetails(recipientAddr).paymentCredential.hash;
    } catch (error) {
      log("Error: Invalid recipient address format");
      return;
    }

    const intervalSeconds = intervalDays * 86400n;
    const now = BigInt(Math.floor(Date.now() / 1000));
    const nextPayment = now + intervalSeconds;

    const datum = mkRecurringDatum(
      payerPkh,
      recipientPkh,
      amountAda,
      intervalSeconds,
      nextPayment
    );

    log("Creating subscription...");

    const tx = await lucid
      .newTx()
      .payToContract(
        scriptAddress,
        { inline: datum },
        { lovelace: amountAda * 12n } // fund 12 cycles
      )
      .addSignerKey(payerPkh)
      .complete();

    const signed = await tx.sign().complete();
    const txHash = await signed.submit();

    log("Recurring payment created: " + txHash.substring(0, 16) + "...");
    
    // Update wallet balance after transaction
    await updateWalletUI();

  } catch (error) {
    console.error("Create subscription error:", error);
    log(`Error: ${error.message}`);
  }
}

/* =====================================================
   EXECUTE PAYMENT
===================================================== */

async function executePayment() {
  try {
    if (!lucid || !walletAddress) {
      log("Error: Please connect wallet first");
      return;
    }

    const utxos = await lucid.utxosAt(scriptAddress);

    if (utxos.length === 0) {
      log("No subscriptions found");
      return;
    }

    // Find subscription for current user
    const payerPkh = lucid.utils.getAddressDetails(walletAddress).paymentCredential.hash;
    let subUtxo = null;
    let d = null;

    for (const utxo of utxos) {
      if (!utxo.datum) continue;
      try {
        const datum = Data.from(utxo.datum, RecurringDatum);
        if (datum.rdPayer === payerPkh) {
          subUtxo = utxo;
          d = datum;
          break;
        }
      } catch (error) {
        continue;
      }
    }

    if (!subUtxo) {
      log("No active subscription found for your wallet");
      return;
    }

    // Check if payment is due
    const now = BigInt(Math.floor(Date.now() / 1000));
    if (d.rdNextPayment > now) {
      const nextDate = new Date(Number(d.rdNextPayment) * 1000);
      log(`Payment not due yet. Next payment: ${nextDate.toLocaleDateString()}`);
      return;
    }

    log("Executing payment...");

    const newDatum = mkRecurringDatum(
      d.rdPayer,
      d.rdRecipient,
      d.rdAmount,
      d.rdInterval,
      d.rdNextPayment + d.rdInterval
    );

    const recipientAddress = lucid.utils.credentialToAddress({
      type: "Key",
      hash: d.rdRecipient,
    });

    const tx = await lucid
      .newTx()
      .collectFrom([subUtxo], payRedeemer)
      .attachSpendingValidator(script)
      .payToAddress(recipientAddress, { lovelace: d.rdAmount })
      .payToContract(
        scriptAddress,
        { inline: newDatum },
        { lovelace: BigInt(subUtxo.assets.lovelace) - d.rdAmount }
      )
      .complete();

    const signed = await tx.sign().complete();
    const txHash = await signed.submit();

    log("Payment executed: " + txHash.substring(0, 16) + "...");

  } catch (error) {
    console.error("Execute payment error:", error);
    log(`Error: ${error.message}`);
  }
}

/* =====================================================
   CANCEL SUBSCRIPTION
===================================================== */

async function cancelRecurring() {
  try {
    if (!lucid || !walletAddress) {
      log("Error: Please connect wallet first");
      return;
    }

    const payerPkh = lucid.utils.getAddressDetails(walletAddress).paymentCredential.hash;

    const utxos = await lucid.utxosAt(scriptAddress);

    const subUtxo = utxos.find((u) => {
      if (!u.datum) return false;
      try {
        const d = Data.from(u.datum, RecurringDatum);
        return d.rdPayer === payerPkh;
      } catch (error) {
        return false;
      }
    });

    if (!subUtxo) {
      log("No subscription found");
      return;
    }

    // Ask for confirmation
    if (!confirm("Are you sure you want to cancel this subscription?")) {
      return;
    }

    log("Cancelling subscription...");

    const tx = await lucid
      .newTx()
      .collectFrom([subUtxo], cancelRedeemer)
      .attachSpendingValidator(script)
      .addSignerKey(payerPkh)
      .complete();

    const signed = await tx.sign().complete();
    const txHash = await signed.submit();

    log("Subscription cancelled: " + txHash.substring(0, 16) + "...");
    
    // Update wallet balance after cancellation
    await updateWalletUI();

  } catch (error) {
    console.error("Cancel subscription error:", error);
    log(`Error: ${error.message}`);
  }
}

/* =====================================================
   UI
===================================================== */

function log(msg) {
  const logContainer = document.getElementById("log");
  if (!logContainer) return;
  
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const logEntry = document.createElement("div");
  logEntry.className = "log-entry";
  
  // Check if it's an error message
  let logClass = "log-message";
  if (msg.toLowerCase().startsWith("error:")) {
    logClass = "log-error";
  } else if (msg.toLowerCase().includes("success")) {
    logClass = "log-success";
  } else if (msg.toLowerCase().includes("creating") || msg.toLowerCase().includes("executing") || msg.toLowerCase().includes("cancelling")) {
    logClass = "log-warning";
  }
  
  logEntry.innerHTML = `
    <span class="log-time">${time}</span>
    <span class="${logClass}">${msg}</span>
  `;
  
  logContainer.appendChild(logEntry);
  logContainer.scrollTop = logContainer.scrollHeight;
}

/* =====================================================
   EVENT LISTENERS
===================================================== */

document.addEventListener("DOMContentLoaded", function() {
  // Add existing event listeners
  document.getElementById("connect").onclick = init;
  document.getElementById("create").onclick = createRecurringPayment;
  document.getElementById("pay").onclick = executePayment;
  document.getElementById("cancel").onclick = cancelRecurring;
  
  // Add custom interval toggle
  const intervalSelect = document.getElementById("interval");
  const customContainer = document.getElementById("customIntervalContainer");
  
  if (intervalSelect && customContainer) {
    intervalSelect.addEventListener("change", function() {
      if (this.value === "custom") {
        customContainer.style.display = "block";
      } else {
        customContainer.style.display = "none";
      }
    });
  }
  
  // Add clear log functionality
  const clearLogBtn = document.getElementById("clearLog");
  if (clearLogBtn) {
    clearLogBtn.onclick = function() {
      const logContainer = document.getElementById("log");
      if (logContainer) {
        logContainer.innerHTML = '';
        log("Log cleared");
      }
    };
  }
  
  // Initial status
  updateStatus(false);
  log("Ready. Connect your wallet to begin.");
});

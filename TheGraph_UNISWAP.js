/**
 * @OnlyCurrentDoc
 */
async function UNISWAP(days,volume,liquidity,tx_count){

	// [1] Computing the threshold date (createdAtTimestamp_gte) in UNIX timestamp format
	unix_day=Math.floor(Date.now() / 1000-parseFloat(days)*86400);
	
	// [2] Changing the fixed parameters from the model with the floating parameters (making sure they are in string format)
	var graphql = JSON.stringify({
      query: "query{\n  \n  pools( where: {\n      volumeUSD_gte:"+String(volume)+"\n      totalValueLockedUSD_gte: "+String(liquidity)+"\n      txCount_gte:"+String(tx_count)+"\n      createdAtTimestamp_gte: "+String(unix_day)+"\n    } \n		) {\n  \n    token0 {\n      symbol\n    }\n    token0Price\n    token1 {\n      symbol\n    }\n    token1Price\n    id\n    volumeUSD\n    createdAtTimestamp\n    totalValueLockedUSD\n    txCount\n  }}",
        variables: {}
      })

      // [3] Copy/Pasting the requestOptions variable from Postman javascript code
      var requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        payload: graphql,
        redirect: 'follow'
      };

      // [4] Calling the URLfetch using the ImportJSONAdvanced function (by Brad Jasper and Trevor Lohrbeer version 1.5) that was created for Google sheets
      return ImportJSONAdvanced('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',requestOptions,'','noInherit',includeXPath_,defaultTransform_);
}

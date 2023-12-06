const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Define the POST endpoint
app.post('/api/postData', (req, res) => {
  const requestData = req.body;

  console.log(requestData);

  let resp;

  if (requestData.imp) {
    resp = {
      "54d654aec016f1c": {
        "cpm": 15,
        "pricing": {
          "floor": 0,
          "buckets": null
        },
        "metadata": {
          "landingPageDomain": [
            "actiononguns.app.neoncrm.com"
          ]
        },
        "id": requestData?.imp[0]?.pid,
        "adm": "<img height=\"1\" width=\"1\" style=\"display:none\" src=\"https://kraken.prod.kargo.com/api/v1/event/won?ctx=53fbcd51-1143-4efc-bd56-ea9ee4200f1f\"/>   <script type=\"text/javascript\"> (function(w){if(typeof w.__krg_load_started==='undefined'||!w.__krg_load_started){if(typeof(w.Kargo||{}).loaded==='undefined'){var s=w.document.createElement('script');s.type='text/javascript';s.src='https://storage.cloud.kargo.com/ad/network/tag/v3/_d8DYfIpNNeLBLkzJ5rJFm2uP.js';w.document.head.appendChild(s)}w.__krg_load_started=true}(w.Kargo=w.Kargo||{}).ads=w.Kargo.ads||[];w.Kargo.ads.push({kargo_id:\"_zlXkxei85n\",source_window:window,source_element:document.currentScript,kraken:{\"creative_settings\":null,\"kargo_id\":\"_zlXkxei85n\",\"krg_imp_id\":\"53fbcd51-1143-4efc-bd56-ea9ee4200f1f\",\"page_view_id\":\"9d727b65-ea37-48d7-b501-49abe12355f4\",\"krk_imp_tracker\":\"https://kraken.prod.kargo.com/api/v1/event/adtag-pixel?ctx=53fbcd51-1143-4efc-bd56-ea9ee4200f1f&adtag_version={AD_TAG_VERSION}\",\"context\":\"\",\"id\":\"KM-CREA-136740\",\"auction_type\":\"direct\",\"adm\":\"PGEgaHJlZj0iaHR0cHM6Ly90ay5rYXJnby5jb20vdC9jbGljay4xMHhnMmp0bHBoaWo0dGk/cmFuZD0zMTk2ODA0MDAyMjQxMDIyJnV1aWQ9NTNmYmNkNTEtMTE0My00ZWZjLWJkNTYtZWE5ZWU0MjAwZjFmJmFzbG90PV96bFhreGVpODVuJmNyZWF0aXZlX3NvdXJjZT1rbSZjcmVhdGl2ZV9pZD0xMzY3NDAmaWRfYWxwaGE9S00tQ1JFQS0xMzY3NDAmdXJsPSUlQ0xJQ0tfVVJMX1VORVNDJSVodHRwczovL2FjdGlvbm9uZ3Vucy5hcHAubmVvbmNybS5jb20vZm9ybXMvMTUiIHRhcmdldD0iX2JsYW5rIj4KPGltZyBzcmM9Imh0dHBzOi8vc3RvcmFnZS5jbG91ZC5rYXJnby5jb20vY3AvdXBsb2Fkcy8xNzAxMTI2MDM1XzY1NjUxZjkzMDJiNmEuYXZpZj9maWxlbmFtZT0vMTcwMTEwNjgwOV82NTY0ZDQ3OTE3ZDMxLmF2aWYiIHdpZHRoPSIzMDAiIGhlaWdodD0iNjAwIiBhbHQ9IiIgLz4KPC9hPgo8aW1nIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGFsdD0iIiBzdHlsZT0icG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiAtOTk5OXB4OyIgc3JjPSJodHRwczovL3RrLmthcmdvLmNvbS90L2ltcHJlc3Npb24uMTB4ZzJqdGxwaGlqNHRoP3JhbmQ9MzE5NjgwNDAwMjI0MTAyMiZ1dWlkPTUzZmJjZDUxLTExNDMtNGVmYy1iZDU2LWVhOWVlNDIwMGYxZiZhc2xvdD1femxYa3hlaTg1biZjcmVhdGl2ZV9zb3VyY2U9a20mY3JlYXRpdmVfaWQ9MTM2NzQwJmlkX2FscGhhPUtNLUNSRUEtMTM2NzQwJnVybD0iIC8+CjwhLS0KImtyZ19hZF9pbmZvIjp7CiAgICAiY3JlYXRpdmVJZCI6IDEzNjc0MCwKICAgICJmb3JtYXQiOiAiSGFsZlBhZ2UiLAogICAgImNyZWF0aXZlT3JpZ2luIjogImttIiwKICAgICJpZEFscGhhIjogIktNLUNSRUEtMTM2NzQwIiwKICAgICJleGVjdXRpb24iOiAic3RhbmRhcmQiLAogICAgInBsYWNlbWVudCI6IHsKICAgICAgICAidHlwZSI6ICJzdGFuZGFyZCIKICAgIH0sCiAgICAiYXNkYXRhIjogewogICAgICAgICJzaXRpZCI6ICJnaXptb2RvLmNvbSIsCiAgICAgICAgImFkdmlkIjogIiIsCiAgICAgICAgImNhbWlkIjogIjExMTIxIiwKICAgICAgICAibGluaWQiOiAiMTcyNzk4IiwKICAgICAgICAiY3JlaWQiOiAiS00tQ1JFQS0xMzY3NDAiLAogICAgICAgICJhZHVpZCI6ICIlZXBpZCEiLAogICAgICAgICJzaXplIjogewogICAgICAgICAgICAidyI6ICIxIiwKICAgICAgICAgICAgImgiOiAiMSIKICAgICAgICB9CiAgICB9LAogICAgInNldHRpbmdzIjogewogICAgICAgICJicmFuZGluZyI6ICJrYXJnbyIsCiAgICAgICAgImhhc19yZXNwb25zaXZlX3dpZHRoIjogdHJ1ZSwKICAgICAgICAiY29tcGFuaW9uIjogIiIsCiAgICAgICAgInNvY2FuQ2VsdHJhRnJvbnQiOiAiIiwKICAgICAgICAic29jYW5DZWx0cmFCYWNrIjogIiIsCiAgICAgICAgInRyYWNraW5nIjogW10KICAgIH0KfQotLT4=\",\"kraken_id\":\"172798\",\"tracking\":{\"serve\":[],\"win\":[],\"view\":\"https://kraken.prod.kargo.com/api/v1/event/moat?ctx=53fbcd51-1143-4efc-bd56-ea9ee4200f1f\",\"billable\":[\"https://kraken.prod.kargo.com/api/v1/event/billable?ctx=53fbcd51-1143-4efc-bd56-ea9ee4200f1f&adtag_version={AD_TAG_VERSION}\"],\"blocked\":[\"https://kraken.prod.kargo.com/api/v1/event/blocked?ctx=53fbcd51-1143-4efc-bd56-ea9ee4200f1f\"],\"click\":[\"https://kraken.prod.kargo.com/api/v1/event/click?ctx=53fbcd51-1143-4efc-bd56-ea9ee4200f1f\"],\"video_start\":[\"https://kraken.prod.kargo.com/api/v1/event/video/start?ctx=53fbcd51-1143-4efc-bd56-ea9ee4200f1f&adid={ADID}\"],\"video_first_quartile\":[\"https://kraken.prod.kargo.com/api/v1/event/video/first-quartile?ctx=53fbcd51-1143-4efc-bd56-ea9ee4200f1f&adid={ADID}\"],\"video_midpoint\":[\"https://kraken.prod.kargo.com/api/v1/event/video/midpoint?ctx=53fbcd51-1143-4efc-bd56-ea9ee4200f1f&adid={ADID}\"],\"video_third_quartile\":[\"https://kraken.prod.kargo.com/api/v1/event/video/third-quartile?ctx=53fbcd51-1143-4efc-bd56-ea9ee4200f1f&adid={ADID}\"],\"video_skip\":[\"https://kraken.prod.kargo.com/api/v1/event/video/skip?ctx=53fbcd51-1143-4efc-bd56-ea9ee4200f1f&adid={ADID}\"],\"video_complete\":[\"https://kraken.prod.kargo.com/api/v1/event/video/complete?ctx=53fbcd51-1143-4efc-bd56-ea9ee4200f1f&adid={ADID}\"],\"video_error\":[\"https://kraken.prod.kargo.com/api/v1/event/video/error?ctx=53fbcd51-1143-4efc-bd56-ea9ee4200f1f&errorcode=[ERRORCODE]&adid={ADID}\"],\"video_load\":[\"https://kraken.prod.kargo.com/api/v1/event/video/load?ctx=53fbcd51-1143-4efc-bd56-ea9ee4200f1f&adid={ADID}\"]}}\n});(w.Kargo.loadAds||function(){})()})(function(){var w=window;try{w=w.top.document?w.top:w}catch(e){}return w}()); </script> <img height=\"1\" width=\"1\" style=\"display:none\" src=\"https://kraken.prod.kargo.com/api/v3/event/serve?ctx=53fbcd51-1143-4efc-bd56-ea9ee4200f1f\"/>",
        "receivedTracker": "https://kraken.prod.kargo.com/api/v1/event/received?ctx=53fbcd51-1143-4efc-bd56-ea9ee4200f1f",
        "targetingPrefix": "",
        "currency": "USD",
        "mediaType": "banner",
        "width": 300,
        " height": 600,
        "bidID": requestData?.imp[0]?.id
      }
    };
  }

  // Set CORS headers
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500/kargoTestPage.html');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  // Respond with a JSON object
  res.json(resp);
});

// Load SSL certificates
// const privateKey = fs.readFileSync('private-key.pem', 'utf8');
// const certificate = fs.readFileSync('public-cert.pem', 'utf8');
// const credentials = { key: privateKey, cert: certificate };

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);

// Start the server
httpsServer.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});

const config = {};

config.host = process.env.HOST || "https://web-page-db-account.documents.azure.com:443/";
config.authKey =
  process.env.AUTH_KEY || "EhMvSf7aGcDIxAO4HHlG6M7etCGrIs91cocYa22tQ9btgYNJQl70l3FzrvJegBqTTiuxDtD6ecWHACDbvRgcdA==";
config.databaseId = "StaffFeedback";
config.containerId = "Feedback";

if (config.host.includes("https://localhost:")) {
  console.log("Local environment detected");
  console.log("WARNING: Disabled checking of self-signed certs. Do not have this code in production.");
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  console.log(`Go to http://localhost:${process.env.PORT || '3000'} to try the sample.`);
}

module.exports = config;
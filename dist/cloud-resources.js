if (window.ag == null) {
  window.ag = {};
}
window.ag.data = {
  "options": {
    "baseUrl": "https://rest-api.appgyver.com/v2/",
    "headers": {
      "steroidsApiKey": "8e81e12ba6f105ee32c902e2656d05912bb85c728465a1ff3a03344f0ab7e417",
      "steroidsAppId": 59837
    }
  },
  "resources": {
    "progresstable": {
      "schema": {
        "fields": {
          "createdAt": {
            "type": "string"
          },
          "objectId": {
            "type": "string",
            "identity": true
          },
          "photo": {
            "type": "string"
          },
          "updatedAt": {
            "type": "string"
          }
        },
        "identifier": "objectId"
      }
    }
  }
};
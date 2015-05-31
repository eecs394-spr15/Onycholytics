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
    },
    "usertable": {
      "schema": {
        "fields": {
          "createdAt": {
            "type": "string"
          },
          "isPatient": {
            "type": "boolean"
          },
          "myPhotos": {
            "type": "array"
          },
          "objectId": {
            "type": "string",
            "identity": true
          },
          "password": {
            "type": "string"
          },
          "updatedAt": {
            "type": "string"
          },
          "username": {
            "type": "string"
          }
        },
        "identifier": "objectId"
      }
    },
    "usermessage": {
      "schema": {
        "fields": {
          "coordID": {
            "type": "string"
          },
          "createdAt": {
            "type": "string"
          },
          "isRead": {
            "type": "integer"
          },
          "message": {
            "type": "object"
          },
          "objectId": {
            "type": "string",
            "identity": true
          },
          "patientID": {
            "type": "string"
          },
          "testCol": {
            "type": "string"
          },
          "updatedAt": {
            "type": "string"
          }
        },
        "identifier": "objectId"
      }
    },
    "coormessage": {
      "schema": {
        "fields": {
          "Read": {
            "type": "boolean"
          },
          "coorID": {
            "type": "string"
          },
          "createdAt": {
            "type": "string"
          },
          "message": {
            "type": "object"
          },
          "objectId": {
            "type": "string",
            "identity": true
          },
          "patientID": {
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
const responseCode = {
  "01": {
    status: 401,
    body: {
      success: false,
      code: "01",
      message: "Auth failed, password doesn't match",
      data: {},
    },
  },
  "02": {
    status: 200,
    body: {
      success: true,
      code: "02",
      message: "You have been signed in successfully",
      data: {},
    },
  },
  "03": {
    status: 200,
    body: {
      success: true,
      code: "03",
      message: "Data has been updated successfully",
      data: {},
    },
  },
  "05": {
    status: 400,
    body: {
      success: false,
      code: "05",
      message: "Missed required header value",
      data: {},
    },
  },
  "06": {
    status: 200,
    body: {
      success: true,
      code: "06",
      message: "Data has been saved successfully",
      data: {},
    },
  },
  "07": {
    status: 500,
    body: {
      success: false,
      code: "07",
      message: "Unexpected server error",
      data: {},
    },
  },
  "08": {
    status: 200,
    body: {
      success: true,
      code: "08",
      message: "Data has been retrieved successfully",
      data: {},
    },
  },
  "10": {
    status: 400,
    body: {
      success: false,
      code: "10",
      message: "This email is used",
      data: {},
    },
  },
  "11": {
    status: 400,
    body: {
      success: false,
      code: "11",
      message: "This userName is not exists",
      data: {},
    },
  },
  "12": {
    status: 200,
    body: {
      success: true,
      code: "12",
      message: "Data has been deleted successfully",
      data: {},
    },
  },
  "13": {
    status: 403,
    body: {
      success: true,
      code: "13",
      message: "Insufficient funds",
      data: {},
    },
  },
  "14": {
    status: 400,
    body: {
      success: false,
      code: "14",
      message: "Invalid money type or value",
      data: {},
    },
  },
  "15": {
    status: 200,
    body: {
      success: true,
      code: "15",
      message: "Money deposited successfully",
      data: {},
    },
  },
  "16": {
    status: 200,
    body: {
      success: true,
      code: "16",
      message: "Money withdraw successfully",
      data: {},
    },
  },
  "17": {
    status: 404,
    body: {
      success: false,
      code: "17",
      message: "Account not found",
      data: {},
    },
  },
  "18": {
    status: 200,
    body: {
      success: true,
      code: "18",
      message: "Money transferred successfully",
      data: {},
    },
  },
};

module.exports = responseCode;

module.exports.generateText = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello from Serverless!" }),
    };
  };
  
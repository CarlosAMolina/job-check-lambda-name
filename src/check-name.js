const MAX_ALLOWED_LENGTH = 64;

document.getElementById("search-button").onclick = function () {
  runInputQuery();
};

document.getElementById("search-input").onkeydown = function (e) {
  if (e.key === "Enter") {
    runInputQuery();
  }
};

function runInputQuery() {
  const searchTerm = document.getElementById("search-input").value;
  try {
    document.getElementById("response-error-div").classList.add("hidden");
    document.getElementById("response-div").classList.remove("hidden");
    const html = getResultHtml(searchTerm);
    document.getElementById("search-result").innerHTML = html;
  } catch (error) {
    console.error(error);
    document.getElementById("response-div").classList.add("hidden");
    document.getElementById("response-error-div").classList.remove("hidden");
    const errorMessage = getErrorMessageToShow(error);
    document.getElementById("error-output").textContent = errorMessage;
  }
}

function getResultHtml(searchTerm) {
  const modified_string = getStringModifiedByDeployPipe(searchTerm);
  const is_valid = hasAllowedSize(modified_string);
  const is_valid_html = getBoolHtml(is_valid);
  return "".concat(
    "<p>Checked string: ",
    searchTerm,
    "</p>",
    "<p>Length of the string: ",
    searchTerm.length,
    "</p>",
    "<p>String modified by the deployment pipeline: ",
    modified_string,
    "</p>",
    "<p>Length of the modified string: ",
    modified_string.length,
    "</p>",
    "<p>Maximum allowed length: ",
    MAX_ALLOWED_LENGTH,
    "</p>",
    "<p>Is a valid string: ",
    is_valid_html,
    "</p>",
  );
}

function getBoolHtml(bool) {
    let color = "red";
    let value = "false";
    if (bool === true) {
      color = "green";
      value = "true";
    }
    return `<span font-weight:bold; style="color:${color};"> ${value} </span>`
}

function getErrorMessageToShow(error) {
  return "Error. ".concat(error.message);
}

function showStringAnalysis(string) {
  console.log(`Checked string: ${string}`);
  console.log(`Length of the string: ${string.length}`);
  const modified_string = getStringModifiedByDeployPipe(string);
  console.log(`String modified by the deployment pipeline: ${modified_string}`);
  console.log(`Length of the modified string: ${modified_string.length}`);
  console.log(`Maximum allowed length: ${MAX_ALLOWED_LENGTH}`);
  const is_valid = hasAllowedSize(modified_string);
  console.log(`Is a valid string: ${is_valid}`);
}

function getStringModifiedByDeployPipe(string) {
  const PREFIX_ADDED = "Service-lambda-";
  const SUFFIX_ADDED = "-dev"; // It can be "-dev" or "-pro".
  return `${PREFIX_ADDED}${string}${SUFFIX_ADDED}`;
}

function hasAllowedSize(string) {
  return string.length <= MAX_ALLOWED_LENGTH;
}

//// TODO uncomment for testing
//export const exportedForTesting = {
//  showStringAnalysis,
//  getStringModifiedByDeployPipe,
//  hasAllowedSize,
//};

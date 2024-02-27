const MAX_ALLOWED_LENGTH = 64;

document.getElementById("search-button").onclick = function () {
  run_input_query();
};

document.getElementById("search-input").onkeydown = function (e) {
  if (e.key === "Enter") {
    run_input_query();
  }
};

function run_input_query() {
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
  const modified_string = get_string_modified_by_deploy_pipe(searchTerm);
  const is_valid = has_allowed_size(modified_string);
  const is_valid_html = getBoolHtml(is_valid);
  return "<p>Checked string: ".concat(
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

function show_string_analysis(string) {
  console.log(`Checked string: ${string}`);
  console.log(`Length of the string: ${string.length}`);
  const modified_string = get_string_modified_by_deploy_pipe(string);
  console.log(`String modified by the deployment pipeline: ${modified_string}`);
  console.log(`Length of the modified string: ${modified_string.length}`);
  console.log(`Maximum allowed length: ${MAX_ALLOWED_LENGTH}`);
  const is_valid = has_allowed_size(modified_string);
  console.log(`Is a valid string: ${is_valid}`);
}

function get_string_modified_by_deploy_pipe(string) {
  const PREFIX_ADDED = "Service-lambda-";
  const SUFFIX_ADDED = "-dev"; // It can be "-dev" or "-pro".
  return `${PREFIX_ADDED}${string}${SUFFIX_ADDED}`;
}

function has_allowed_size(string) {
  return string.length <= MAX_ALLOWED_LENGTH;
}

//// TODO uncomment for testing
//export const exportedForTesting = {
//  show_string_analysis,
//  get_string_modified_by_deploy_pipe,
//  has_allowed_size,
//};

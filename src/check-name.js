const MAX_ALLOWED_LENGTH = 86; // TODO use corret value

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
  return "<p>Checking string: ".concat(
    searchTerm,
    "</p>",
    "<p>Lenght of the string: ",
    searchTerm.length,
    "</p>",
    "<p>String modified by the deployment pipeline: ",
    modified_string,
    "</p>",
    "<p>Lenght of the string modified: ",
    modified_string.length,
    "</p>",
    "<p>Maximum allowed lenght: ",
    MAX_ALLOWED_LENGTH,
    "</p>",
    "<p>Is a valid string: ",
    is_valid,
    "</p>",
  );
}

function getErrorMessageToShow(error) {
  return "Error. ".concat(error.message);
}

function show_string_analysis(string) {
  console.log(`Checking string: ${string}`);
  console.log(`Lenght of the string: ${string.length}`);
  const modified_string = get_string_modified_by_deploy_pipe(string);
  console.log(`String modified by the deployment pipeline: ${modified_string}`);
  console.log(`Lenght of the string modified: ${modified_string.length}`);
  console.log(`Maximum allowed lenght: ${MAX_ALLOWED_LENGTH}`);
  const is_valid = has_allowed_size(modified_string);
  console.log(`Is a valid string: ${is_valid}`);
}

function get_string_modified_by_deploy_pipe(string) {
  const PREFIX_ADDED = "Deploy-"; // TODO use corret value
  const SUFFIX_ADDED = "-dev"; // TODO use corret value
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

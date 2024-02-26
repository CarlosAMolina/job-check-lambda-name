const MAX_ALLOWED_LENGTH = 86; // TODO use corret value

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

export const exportedForTesting = {
  show_string_analysis,
  get_string_modified_by_deploy_pipe,
  has_allowed_size,
};

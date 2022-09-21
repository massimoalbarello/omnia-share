import { VERSION } from "../constants/version";

export const getVersion = (title = '') => {
  return (`${title} ${VERSION}`).trim();
};

// get commit hash from github action env
export const getCommit = (cutCommitHash = true) => {

  let commitHash = process.env['REACT_APP_COMMIT_HASH'] || 'dev';

  if (cutCommitHash) {
    commitHash = commitHash.slice(0, 7);
  }

  return `commit: ${commitHash}` 
};
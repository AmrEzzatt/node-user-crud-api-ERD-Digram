function longestCommon(...strs) {
    // Check constraints: 1 <= strs.length <= 200
    if (strs.length === 0 || strs.length > 200) return "";

    // If only one string, return it
    if (strs.length === 1) return strs[0];

    let prefix = ""; // variable to store the common prefix

    // Loop through characters of the first string
    for (let i = 0; i < strs[0].length; i++) {
        let currentChar = strs[0][i];

        // Compare this character with all other strings
        for (let j = 1; j < strs.length; j++) {
            if (i >= strs[j].length || strs[j][i] !== currentChar) {
                return prefix; // stop at first mismatch
            }
        }

        // Add character if all strings match
        prefix += currentChar;
    }

    return prefix; // all characters matched
}
console.log(longestCommon(""));
console.log(longestCommon("flower","flow","flight")); 
console.log(longestCommon("dog","racecar","car")); 
console.log(longestCommon("a")); 

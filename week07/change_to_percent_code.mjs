const query = "SELECT * FROM permits WHERE permitissuedate >= '2016-01-01'";
const encodedQuery = encodeURIComponent(query);
console.log(encodedQuery);
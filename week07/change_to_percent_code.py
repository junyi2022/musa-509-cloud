import urllib.parse
query = "SELECT * FROM permits WHERE permitissuedate >= '2016-01-01'"
encoded_query = urllib.parse.quote(query)
print(encoded_query)
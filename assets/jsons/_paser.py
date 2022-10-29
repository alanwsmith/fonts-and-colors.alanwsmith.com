#!/usr/bin/env python3

import json

with open('fonts-popular.json') as _json:
    data = json.load(_json)

output_data = {}

for item in data['items']:
    key = item['family'].replace(' ', '').lower()
    output_data[key] = {}
    for file in item['files']:
        output_data[key][file] = item['files'][file]

with open('refined.json', 'w') as _refined:
    json.dump(output_data, _refined)


# print(json.dumps(output_data, sort_keys=True, indent=2))

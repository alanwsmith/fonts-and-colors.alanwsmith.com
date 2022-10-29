#!/usr/bin/env python3

import json
import re

with open("fonts-popular.json") as _json:
    data = json.load(_json)
    with open('options.html', 'w') as _options:
        for i in range(0,1454):
            _options.write('<option value="{}">{}</option>'.format(
                re.sub(' ', '', data['items'][i]['family'].lower()),
                data['items'][i]['family']
            ))
            _options.write("\n")

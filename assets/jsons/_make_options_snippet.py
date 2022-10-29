#!/usr/bin/env python3

import json
import re

with open("fonts-popular.json") as _json:
    data = json.load(_json)

for i in range(0,7):
    print('<option value="{}">{}</option>'.format(
        re.sub(' ', '', data['items'][i]['family'].lower()),
        data['items'][i]['family']
    ))

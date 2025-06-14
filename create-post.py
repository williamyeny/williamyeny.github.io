import os
import re
from datetime import datetime
from zoneinfo import ZoneInfo

title_input = input("Enter title: ")

sanitized_title = re.sub(r"[^a-zA-Z0-9\s]", "", title_input).strip().lower()
kebab_title = re.sub(r"\s+", "-", sanitized_title)

local_tz = ZoneInfo("localtime")
now = datetime.now(local_tz)
date_str = now.strftime("%Y-%m-%d")
datetime_str = now.strftime("%Y-%m-%d %H:%M:%S %z")

filename = f"{date_str}-{kebab_title}.md"
dir_path = os.path.join(os.path.dirname(__file__), "_posts")
os.makedirs(dir_path, exist_ok=True)
file_path = os.path.join(dir_path, filename)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(f"""---
layout: post
title: "{title_input}" 
description:
date: {datetime_str}
author: "Will Ye"
---

""")

print(f"Post created: _posts/{filename}")

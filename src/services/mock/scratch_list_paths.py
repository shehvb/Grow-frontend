import yaml

with open(r"c:\Users\shehab\OneDrive\Desktop\GROW before implementation1\GROW before implementation\Grow-frontend\Grow Educational Platform API.yaml", "r", encoding="utf-8") as f:
    data = yaml.safe_load(f)

for path in data.get("paths", {}).keys():
    print(path)

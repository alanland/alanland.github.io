# -*- coding: utf-8 -*-

import json
import os
import re
import markdown

base = os.getcwd()
blogs = os.path.join(base,'docs/tech-radar')


os.chdir(base)

def generate():
    blips = []
    for (root, dirs, files) in os.walk(blogs):
        for f in files:
            if f.endswith('.md'):
                filename = os.path.join(root, f)
                href = filename.replace(base, '').replace('.md', '.html')
                alink = '<a href="%s" target="_blank">Tech Radar</a>' % href
                with open(filename, 'r') as file:
                    blip = False  # 是否是技术雷达文章
                    reading = False  # 读取 description 中
                    description = ''
                    for line in file.readlines():
                        if not blip and '『技术雷达』' in line:
                            m = re.search('"『技术雷达』(.*)"', line)
                            blip = {'description': '', 'isNew': False, 'name': m.group(1)}
                            blips.append(blip)
                            print(filename)
                        elif blip and line.startswith('## Quadrant'):
                            m = re.search('`(.*)`', line)
                            blip['quadrant'] = m.group(1)
                        elif blip and line.startswith('## Ring'):
                            reading = True
                            m = re.search('`(.*)`', line)
                            blip['ring'] = m.group(1)
                        elif blip and reading and line.startswith('##'):
                            html = markdown.markdown(description).strip()
                            blip['description'] = "%s %s" % (html, alink)
                            break
                        elif blip and reading:
                            description += line

    radar = {
        "title": "Cybertrans Radar",
        "quadrants": ["技术", "工具", "平台", "语言和框架"],
        "rings": ["采用", "实验", "评估", "暂缓"],
        "blips": []
    }

    quadrants = set()
    rings = set()
    for bilp in blips:
        quadrants.add(bilp['quadrant'])
        rings.add(bilp['ring'])
    # radar['quadrants'] = list(quadrants)
    # radar['rings'] = list(rings)
    radar['blips'] = blips

    string = json.dumps(radar, indent=4, ensure_ascii=False)

    print(string)
    with open('radar.json', 'w') as f:
        f.write(string)


def yarn():
    os.system('yarn tech-radar-generator ./radar.json ./dist')


ext_css = '''
p p {
    border: none !important;
    padding: 5px 0 !important;
}
    '''

def update_css():
    for ff in os.listdir('./dist'):
        if ff.startswith('main') and ff.endswith('.css'):
            css = os.path.join('./dist', ff)
            with open(css, 'r') as f:
                lines = f.readlines()
                lines[0] = '@import url(https://www.thoughtworks.com/css/k8s_production/screen.css);'
            with open(css, 'w') as f:
                f.writelines("%s\n" % l for l in lines)
                f.writelines(ext_css)


if __name__ == '__main__':
    generate()
    yarn()
    update_css()

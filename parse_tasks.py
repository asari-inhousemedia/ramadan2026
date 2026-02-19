import os
import re

def parse_markdown(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by days using the Door icon and Tag number
    days = re.split(r'### 🚪 Tag (\d+)', content)
    
    tasks = []
    
    for i in range(1, len(days), 2):
        day_num = int(days[i])
        day_content = days[i+1]
        
        # Split by tasks using the Task number and title
        # Use a regex that handles potential newlines or different bold styles
        task_pattern = r'\*\*Aufgabe (\d+) – ([^*:]+):\*\*'
        task_matches = list(re.finditer(task_pattern, day_content))
        
        for j, match in enumerate(task_matches):
            task_num = int(match.group(1))
            task_title = match.group(2).strip()
            
            # Start of this task body is after the title
            start_pos = match.end()
            # End of this task body is the start of the next task or the end of day content
            end_pos = task_matches[j+1].start() if j + 1 < len(task_matches) else len(day_content)
            
            task_body = day_content[start_pos:end_pos].strip()
            
            # Remove horizontal rules or other week separators that might be at the end
            task_body = re.split(r'---', task_body)[0].strip()
            task_body = re.split(r'> ⭐', task_body)[0].strip()
            
            icon = '🌙'
            title_lower = task_title.lower()
            if any(k in title_lower for k in ['begrüßung', 'grüßen', 'salam']): icon = '👋'
            elif any(k in title_lower for k in ['verstehen', 'nachdenken', 'reflexion', 'vergleichen']): icon = '🧠'
            elif any(k in title_lower for k in ['herz', 'liebe', 'umarmen', 'selbstliebe']): icon = '❤️'
            elif any(k in title_lower for k in ['helf', 'helfer', 'haushalt', 'initiative', 'fürsorge']): icon = '🤝'
            elif any(k in title_lower for k in ['dank', 'danken', 'alhamdulillah']): icon = '🙏'
            elif any(k in title_lower for k in ['ordnung', 'aufräum']): icon = '🧹'
            elif any(k in title_lower for k in ['spenden', 'sadaqa', 'geld']): icon = '💰'
            elif any(k in title_lower for k in ['teil', 'teilen', 'großzügig']): icon = '🤲'
            elif any(k in title_lower for k in ['entschuldig', 'vergeb', 'frieden', 'istighfar']): icon = '🕊️'
            elif any(k in title_lower for k in ['heimlich', 'absicht', 'stille']): icon = '🤫'
            elif any(k in title_lower for k in ['natur', 'schöpfung', 'draußen']): icon = '🌳'
            elif any(k in title_lower for k in ['beten', 'du\'a', 'dua', 'gebet']): icon = '🤲'
            elif any(k in title_lower for k in ['bismillah', 'alhamdulillah', 'allahu akbar', 'tesbih', 'dhikr', 'dhikr']): icon = '📿'
            elif any(k in title_lower for k in ['erklär']): icon = '📢'
            elif any(k in title_lower for k in ['geduld', 'sabr']): icon = '⏳'
            elif any(k in title_lower for k in ['mond']): icon = '🌙'
            elif any(k in title_lower for k in ['bayram', 'eid', 'feier', 'gratulier', 'vorbereit']): icon = '🎉'
            
            tasks.append({
                "day": day_num,
                "title": task_title,
                "icon": icon,
                "task": task_body
            })
            
    return tasks

tasks = parse_markdown('/Users/ahmetsari/Desktop/ramadan2026-main/ramadan-aufgaben-2026.md')

sql_statements = [
    "-- Delete existing tasks to avoid duplicates if re-running",
    "TRUNCATE TABLE daily_tasks;",
    "-- Import parsed tasks from ramadan-aufgaben-2026.md"
]

for t in tasks:
    task_escaped = t['task'].replace("'", "''")
    title_escaped = t['title'].replace("'", "''")
    sql_statements.append(f"INSERT INTO daily_tasks (day, title, icon, task) VALUES ({t['day']}, '{title_escaped}', '{t['icon']}', '{task_escaped}');")

with open('/Users/ahmetsari/Desktop/ramadan2026-main/import_tasks.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql_statements))

print(f"Successfully parsed {len(tasks)} tasks and generated import_tasks.sql")

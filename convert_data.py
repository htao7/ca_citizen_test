
import re
import json
import os

def parse_questions():
    # Read the data.ts file
    try:
        with open('data.ts', 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print("Error: data.ts not found")
        return

    # Extract RAW_DATA
    start_marker = 'const RAW_DATA = `'
    end_marker = '`;'
    
    start_index = content.find(start_marker)
    if start_index == -1:
        print("Error: RAW_DATA start not found")
        return
        
    start_index += len(start_marker)
    end_index = content.find(end_marker, start_index)
    
    if end_index == -1:
        print("Error: RAW_DATA end not found")
        return
        
    raw_data = content[start_index:end_index]
    
    # Normalize line endings
    raw_data = raw_data.replace('\r\n', '\n')
    
    # Split by questions (lookahead for number followed by dot)
    chunks = re.split(r'\n(?=\d+\.)', raw_data)
    
    questions = []
    
    for chunk in chunks:
        if not chunk.strip():
            continue
            
        # Regex to parse each question
        # 1. ID and Question
        id_match = re.search(r'^(\d+)\.\s+(.*)', chunk)
        
        # Options
        option_a_match = re.search(r'A\.\s+(.*)', chunk)
        option_b_match = re.search(r'B\.\s+(.*)', chunk)
        option_c_match = re.search(r'C\.\s+(.*)', chunk)
        option_d_match = re.search(r'D\.\s+(.*)', chunk)
        
        # Answer
        answer_match = re.search(r'Answer:\s+([A-D])', chunk)
        
        if (id_match and option_a_match and option_b_match and 
            option_c_match and option_d_match and answer_match):
            
            letter_to_index = {'A': 0, 'B': 1, 'C': 2, 'D': 3}
            answer_letter = answer_match.group(1).strip()
            
            question_obj = {
                'id': int(id_match.group(1)),
                'question': id_match.group(2).strip(),
                'options': [
                    option_a_match.group(1).strip(),
                    option_b_match.group(1).strip(),
                    option_c_match.group(1).strip(),
                    option_d_match.group(1).strip()
                ],
                'correctAnswerIndex': letter_to_index.get(answer_letter, 0)
            }
            questions.append(question_obj)
            
    # Write to JSON
    output_dir = os.path.join('ios_app', 'CanadaCitizenshipTest', 'Resources')
    os.makedirs(output_dir, exist_ok=True)
    
    output_path = os.path.join(output_dir, 'questions.json')
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(questions, f, indent=2)
        
    print(f"Successfully converted {len(questions)} questions to {output_path}")

if __name__ == "__main__":
    parse_questions()

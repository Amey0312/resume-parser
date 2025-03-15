import sys
import json
import pdfplumber
import spacy

nlp = spacy.load("en_core_web_sm")

def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text.strip()

def extract_resume_details(text):
    doc = nlp(text)
    details = {
        "name": "",
        "email": "",
        "phone": "",
        "skills": []
    }

    # Extract Email
    for token in doc:
        if "@" in token.text and "." in token.text:
            details["email"] = token.text

    # Extract Phone Number
    for ent in doc.ents:
        if ent.label_ == "PHONE":
            details["phone"] = ent.text

    # Extract Skills (Assume noun phrases as skills)
    skills = [chunk.text for chunk in doc.noun_chunks if len(chunk.text.split()) < 3]
    details["skills"] = list(set(skills))

    return details

if __name__ == "__main__":
    pdf_path = sys.argv[1]  # Resume file path passed from Node.js
    text = extract_text_from_pdf(pdf_path)
    resume_data = extract_resume_details(text)
    
    print(json.dumps(resume_data))  # Return data as JSON for Node.js

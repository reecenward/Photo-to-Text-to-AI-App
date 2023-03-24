from flask import Flask, request, jsonify
import os
import base64
from google.cloud import vision_v1
from google.cloud.vision_v1 import types
import openai

# Set up OpenAI API credentials
openai.api_key = "YOUR OPEN AI KEY"

app = Flask(__name__)

@app.route('/', methods=['POST'])
def handle_photo():
    # Get the base64-encoded image data and input text from the request
    photo_base64 = request.json.get('image')
    input_text = request.json.get('text')

    if not photo_base64:
        return jsonify({'error': 'No photo data provided'}), 400

    # Convert the base64-encoded data to bytes
    try:
        photo_bytes = base64.b64decode(photo_base64.split(',')[1])
    except:
        return jsonify({'error': 'Invalid image data'}), 400

    # Initialize the Google Cloud Vision API client
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'YOUR key.json'
    client = vision_v1.ImageAnnotatorClient()

    # Open the image using Pillow and convert to a Google Cloud Vision-compatible format
    try:
        image = types.Image(content=photo_bytes)
    except:
        return jsonify({'error': 'Error opening image data'}), 400

    # Perform text recognition using Google Cloud Vision API
    try:
        response = client.text_detection(image=image)
        image_text = response.full_text_annotation.text
    except Exception as e:
        #return jsonify({'error': f'Error extracting text: {e}'}), 400
        return jsonify({'error': 'Error extracting text: %s' % e}), 400


    # Concatenate the input text and image text to form the prompt
    prompt_with_text = input_text + ' : ' + image_text

    # Send the prompt to the OpenAI API and get the response
    try:
        openai_response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=prompt_with_text,
            max_tokens=250,
            n=1,
            stop=None,
            temperature=0.5,
        )
        result = openai_response.choices[0].text.strip()
    except Exception as e:
        #return jsonify({'error': f'Error processing request: {e}'}), 400
        return jsonify({'error': 'Error extracting text: %s' % e}), 400


    # Return a JSON response with the result
    return jsonify({'result': result})

if __name__ == '__main__':

    app.config['JSON_SORT_KEYS'] = False
    app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
    app.run(debug=True, host='0.0.0.0', port=8080)
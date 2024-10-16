from flask import Flask, request, send_file
from flask_cors import CORS
from rembg import remove
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

@app.route('/api/remove-background', methods=['POST'])
def remove_background():
    if 'image' not in request.files:
        return 'No image file uploaded', 400

    file = request.files['image']
    
    # Read the image file
    input_image = Image.open(file.stream)
    
    # Remove the background
    output_image = remove(input_image)
    
    # Save the result to a byte stream
    img_byte_arr = io.BytesIO()
    output_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    
    return send_file(img_byte_arr, mimetype='image/png')

if __name__ == '__main__':
    app.run()
import io
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from ultralytics import YOLO

#Import this when using second method:
# from flask import send_file


model = YOLO('model/best.pt')  

names = model.names 

app = Flask(__name__)
CORS(app) 

@app.route('/')
def home():
    return "Hello, World!"

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    image = Image.open(file.stream)

    results = model.predict(image)

    annotated_image = results[0].plot() 
    annotated_image = annotated_image[:, :, ::-1]
    
    # This is the code when sending images by converting them to base64
    buffered = io.BytesIO()
    Image.fromarray(annotated_image).save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
    detections = []
    for box in results[0].boxes:
        detections.append({
            "disease": names[int(box.cls.item())],
            "conf": box.conf.item(),
        })

    return jsonify({
        'annotated_image': img_str,
        'detections': detections
    })

    ##This is the code when sending images directly
    # annotated_pil = Image.fromarray(annotated_image)
    # annotated_pil.save('test.jpg')

    # # Convert to bytes
    # img_io = io.BytesIO()
    # annotated_pil.save(img_io, 'JPEG')
    # img_io.seek(0)

    # return send_file(img_io, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
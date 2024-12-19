from flask import Flask, request, jsonify, send_file
import numpy as np
import tensorflow as tf
from PIL import Image
import io
import os


app = Flask(__name__)


MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "cauli_disease.keras")
model = tf.keras.models.load_model(MODEL_PATH)


INPUT_SIZE = (128, 128)


def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image = image.resize(INPUT_SIZE)
    image_array = np.array(image, dtype=np.float32) / 255.0  
    image_array = np.expand_dims(image_array, axis=0)  
    return image_array


def postprocess_mask(mask):
    print(mask.shape)
    mask = np.argmax(mask, axis=-1) 
    print(mask.shape)
    mask = np.squeeze(mask)
    print(np.unique(mask),mask.shape)
    return mask

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image_file = request.files['image']
    try:
        # Preprocess the image
        image_array = preprocess_image(image_file.read())
        # image_array = np.random.rand(1,128,128,3)
        # Predict the segmentation mask
        print(image_array.shape, type(image_array))
        prediction = model.predict(image_array)
        print(prediction.shape)
        mask = postprocess_mask(prediction[0])
       
        mask_image = Image.fromarray(mask, mode='L')

        # Save mask image to a buffer
        buffer = io.BytesIO()
        mask_image.save(buffer, format="PNG")
        buffer.seek(0)

        return send_file(buffer, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
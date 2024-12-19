from setuptools import setup, find_packages

setup(
    name="unet_segmentation",
    version="0.1.0",
    description="A Flask-based backend for U-Net segmentation model",
    author="Plant care team",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "Flask==2.2.2",
        "numpy==1.23.5",
        "tensorflow==2.11.0",
        "Pillow==9.3.0"
    ],
    entry_points={
        'console_scripts': [
            'dev=unet_segmentation.app:start_server'
        ]
    },
)

import cv2 from 'opencv4nodejs';
import { decode } from 'jsqr';
import { dialog } from 'electron';
import { clipboard } from 'electron';
import path from 'path';
import fs from 'fs';
import React, { useState } from 'react';

// Function to scan QR code from image and save results to text file in Downloads
function scanQrAndSaveToFile(imagePath) {
    // Read image from the provided path
    const image = cv2.imread(imagePath);

    // Check if the image was read successfully
    if (image.empty) {
        console.log("Cannot read image from the path!");
        return [];
    }

    // Scan for QR codes in the image
    const qrCodes = decode(image);

    // If no QR code found
    if (!qrCodes.length) {
        console.log("No QR code found in the image.");
        return [];
    }

    // Return the data of the found QR codes
    const qrDataList = qrCodes.map(obj => obj.data.toString('utf-8')); // Get data from QR code
    return qrDataList;
}

// Function to choose image and display QR data in table
function chooseImage() {
    // Open dialog to choose image
    const imagePath = dialog.showOpenDialogSync({
        title: "Choose Image",
        filters: [{ name: 'Image files', extensions: ['jpg', 'jpeg', 'png'] }]
    });

    // Check if the user has selected an image
    if (!imagePath || !imagePath.length) {
        console.log("No image selected.");
        return;
    }

    // Scan QR code and get data
    const qrDataList = scanQrAndSaveToFile(imagePath[0]);

    // If there is QR data, display it in the table
    if (qrDataList.length) {
        qrDataList.forEach(qrData => {
            qrTable.insert('', 'end', { values: [qrData] }); // Add data to table
        });
    }
}

// Function to copy selected QR data to clipboard
function copyToClipboard() {
    const selectedItem = qrTable.getSelection(); // Get selected row
    if (selectedItem.length) {
        const qrData = qrTable.item(selectedItem[0]).values[0]; // Get value from selected row
        clipboard.writeText(qrData); // Copy data to clipboard
        console.log(`Copied: ${qrData}`);
    }
}

// Create Electron window and UI
const { app, BrowserWindow } = require('electron');
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html'); // Load your HTML file

    // Create UI elements (buttons, table, etc.) here
    // ...
});

export default scanQrAndSaveToFile; chooseImage; copyToClipboard;

// Utility to download project files as a zip
import JSZip from 'jszip';
import { FileItem } from '../types';

/**
 * Recursively adds files to the zip
 */
function addFilesToZip(zip: JSZip, files: FileItem[], parentPath: string = '') {
  files.forEach((file) => {
    const filePath = parentPath ? `${parentPath}/${file.name}` : file.name;
    
    if (file.type === 'file' && file.content) {
      zip.file(filePath, file.content);
    } else if (file.type === 'folder' && file.children) {
      addFilesToZip(zip, file.children, filePath);
    }
  });
}

/**
 * Download project files as a zip file
 */
export async function downloadProjectAsZip(files: FileItem[], projectName: string = 'my-project') {
  if (files.length === 0) {
    alert('No files to download');
    return;
  }

  try {
    const zip = new JSZip();
    
    // Add all files to the zip
    addFilesToZip(zip, files);
    
    // Generate the zip file
    const blob = await zip.generateAsync({ type: 'blob' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName}.zip`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error creating zip file:', error);
    alert('Failed to create zip file. Please try again.');
  }
}

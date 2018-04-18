import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

export const Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  storagePath: '/Users/0zm0z1z/',
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    }
    return 'Please upload image, with size equal or less than 10MB';
  }
});

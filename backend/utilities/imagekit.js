const ImageKit = require('@imagekit/nodejs');
const {
  toFile
} = require('@imagekit/nodejs');

const client = new ImageKit( {
  privateKey: 'private_SCkmS325AMrjr0WlcJtKDwC8LgA=', // This is the default and can be omitted
});



// this function return an object {error} || {response}
async function uploadFile(name, buffer) {
  try {
    const response = await client.files.upload({
      file: await toFile(buffer),
      fileName: name,
    });
    return { response }
  }catch(err) {
    return {error: err.message}
  }
}



async function removeFile(id){
  try {
    const result = await client.files.delete(id);
  } catch (error) {}
}


module.exports = {
  uploadFile,removeFile
}
UsersImage = new FS.Collection("users-image", {
   stores: [
     new FS.Store.GridFS("original")
   ],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});

# InstaVibe 📸

InstaVibe is a social media-inspired app where users can capture photos, add captions, and view posts.

---

## Features ✨

- Capture photos using camera.
- Upload photos with username and caption.
- Store images in Cloudinary and metadata in MongoDB.
- Fetch posts by user or all users.
- Delete posts (removes both Cloudinary image and MongoDB entry).

---

## Project Structure 🗂

```
frontend/
  └─ my-app/
      └─ src/components/
          ├─ Click.jsx       # Camera & upload
          └─ SearchUser.jsx  # Search posts/users

backend/
  ├─ index.js   # Multer backend (local storage)
  └─ server.js  # Cloudinary backend (hosted)
```

> The hosted backend uses Cloudinary (`server.js`).

---

## Setup 💻

### Clone repo
```bash
git clone https://github.com/deekshashettyyy/InstaVibe.git
cd InstaVibe
```

### Backend
```bash
cd backend
nodemon index.js
```

Add `.env` file:
```
MONGO_URI=<your MongoDB URL>
CLOUD_NAME=<Cloudinary name>
CLOUD_API_KEY=<Cloudinary key>
CLOUD_API_SECRET=<Cloudinary secret>
```

### Frontend
```bash
cd frontend/my-app
npm install
npm run dev
```

--- 
## Deployment 🌐

- **Backend:** Hosted on Render  
- **Frontend:** Hosted on Firebase  
- Use environment variables for sensitive credentials.

## Tech Stack & Tips 🛠️

- **Frontend:** React, Axios  
- **Backend:** Node.js, Express, Multer-Cloudinary-Storage  
- **Database:** MongoDB  
- **Image Hosting:** Cloudinary (CDN, better than server storage)  
- **Security Tip:** Keep API keys in `.env` and never push to GitHub  

--- 

## Future Improvements 🚀

1. Add user authentication.
2. Like and comment system.
3. Profile pages.
4. Image filters before upload.

---

## Developed By 👩‍💻

**Deeksha Shetty**  
> Feel free to connect for contributions, suggestions, or queries.

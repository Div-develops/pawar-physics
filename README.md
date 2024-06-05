
---

# PawarPhysics

PawarPhysics is a web application for reading physics notes on various topics of CBSE class IX,X,XI.It gives upload file feature to only one person,you can give multiple people access for uploading notes. Students can search the topics and get notes relted to it. Currently the notes is all scanned version. They were written by a senior physics lecturer,my father.
Students can also get classwise results of notes

## Screenshots
![Screenshot 2024-06-05 015129](https://github.com/Div-develops/PawarPhysics/assets/75534560/ad2c6e98-4d7f-4465-8bf7-20392e9bbf18)![Screenshot 2024-06-05 014427](https://github.com/Div-develops/PawarPhysics/assets/75534560/170d6b4d-db33-482f-9da4-9f03a4050219)
![Screenshot 2024-06-05 014532](https://github.com/Div-develops/PawarPhysics/assets/75534560/dd201695-0e6d-47cc-a55e-f376f2e397e1)
![Screenshot 2024-06-05 141724](https://github.com/Div-develops/PawarPhysics/assets/75534560/aaf4e245-91ca-4252-aa3c-c3a9c10e2601)

![Screenshot 2024-06-05 014643](https://github.com/Div-develops/PawarPhysics/assets/75534560/68c21618-acaf-46a8-a9c4-e09e46983430)
![Screenshot 2024-06-05 015054](https://github.com/Div-develops/PawarPhysics/assets/75534560/0bb9f601-5610-402d-9092-7f6c37435587)
![Screenshot 2024-06-05 015017](https://github.com/Div-develops/PawarPhysics/assets/75534560/a5690045-2138-495e-957c-2a2bb2423470)

## Features

- Upload PDF files containing notes.
- Organize notes by class and topic.
- Preprocessing of titles to determine folder structure for storage.
- Display of upload status (success or failure).

## Installation

1. Clone the repository:

```
git clone https://github.com/Div-develops/PawarPhysics.git
```

2. Install dependencies:

```
cd PawarPhysics
npm install
```

3. Set up Firebase:

   - Create a Firebase project.
   - Set up Firebase Storage and obtain the configuration.
   - Update the Firebase configuration in `firebase.js` and `UploadFile.js`.

4. Run the application:

```
npm start
```

The application will be running at `http://localhost:3000`.



## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.





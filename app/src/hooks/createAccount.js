import { setDoc, doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "services/firebase";
// import { is } from "immutable";
// import { list } from "firebase/storage";

export const createUser = async (output, currentUser) => {
    
    const email = output.email;
    const password = output.password;
    const role = output.role;

    console.log(email, password, role)

    if (currentUser && role=== "student") {
      await setDoc(doc(db, "users", currentUser.uid), {
        uid: currentUser.uid,
        email: email,
        password: password,
        role: role,
        listCourses: {},
      });
      console.log("Create user successfully");
    }

    if (currentUser && role=== "teacher") {
      await setDoc(doc(db, "users", currentUser.uid), {
        uid: currentUser.uid,
        email: email,
        password: password,
        role: role,
        listStudents:{},
      });
      console.log("Create user successfully");
    }

  };
export async function existAccount(email){
  const accRef=doc(db,"users",email);
  const accDoc= await getDoc(accRef);
  const account=accDoc.data();
  return account!=undefined;
}
// export const createAccount = async (output) => {
//     createUserWithEmailAndPassword(auth, output.email, output.password)
//       .then((userCredential) => {
//         console.log(userCredential);
//         createUser(output, userCredential.user);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//       if (await existAccount(output.email)) return{status: "Error", message: "This account has existed!"};
//       await setDoc(doc(db, 'users', output.email), {
//         email: output.email,
//         password: output.password,
//         role: output.role,
//         listCourses: {},
//         name: 'user',
//         isActive: true,
//       });
//       return {status: "Success", message: "Create account successfully!"};
//   };

export const createAccount = async (output) => {
  try {
    // Tạo tài khoản trên Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, output.email, output.password);
    const user = userCredential.user;
    
    // Thêm thông tin người dùng vào collection 'users' với ID ngẫu nhiên
    const userRef = await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: output.email,
      password: output.password,
      role: output.role,
      listCourses: {},
      name: output.name,
      isActive: true,
      major: output.major,
      department: output.department,
      // birthdate: output.birthdate
    });

    console.log("User created successfully with ID:", userRef.id);
    return { status: "Success", message: "Create account successfully!" };
  } catch (error) {
    console.error("Error creating account:", error);
    return { status: "Error", message: error.message };
  }
};
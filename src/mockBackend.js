import axios from 'axios';

const dummyCourse = {
  _id: "c1",
  title: "Dummy Course for UI Preview",
  image: "https://picsum.photos/400/250",
  description: "This is a dummy course to allow editing and previewing the UI without a backend.",
  available: true,
  students: [1, 2, 3],
  rating: 4.5,
  price: 50,
  instructor: { name: "John Doe" },
  category: { name: "Web Development" }
};

const dummyUser = {
  _id: "u1",
  name: "Dummy UI User",
  email: "dummy@ui.com",
  role: "student",
  profilePicture: "https://picsum.photos/100",
  courses: [dummyCourse]
};

const dummyCategory = {
  _id: "cat1",
  name: "Web Development",
  image: "https://picsum.photos/400/250"
};

// Create a safe deep mock object that won't throw errors when nested properties are accessed
const createSafeProxy = (defaultArray = [], defaultString = "") => {
  const handler = {
    get: (target, prop) => {
      // Known arrays used in maps
      if (['courses', 'categories', 'users', 'instructors', 'students', 'favorites', 'favorite', 'cart', 'papers', 'allCourses', 'searchResults', 'responses'].includes(prop)) {
        if (['courses', 'allCourses', 'searchResults'].includes(prop)) return [dummyCourse, dummyCourse];
        if (prop === 'categories') return [dummyCategory, dummyCategory];
        if (prop === 'users' || prop === 'instructors' || prop === 'students') return [dummyUser, dummyUser];
        if (prop === 'responses') return [{ text: "Dummy Chat Response", user: "bot" }];
        if (prop === 'favorite') return [dummyCourse];
        return [dummyCourse];
      }
      // Known objects
      if (['course', 'user', 'instructor', 'category', 'profile'].includes(prop)) {
        if (prop === 'course') return dummyCourse;
        return dummyUser;
      }
      if (prop === 'length') return 2;
      if (prop === 'map' || prop === 'filter' || prop === 'forEach') return Array.prototype[prop].bind([dummyCourse, dummyCourse]);
      if (prop === 'then' || prop === 'catch' || prop === 'finally') return undefined; // Prevent infinite loop in Promise checks
      if (prop === 'toString' || prop === 'valueOf') return () => defaultString;
      if (typeof prop === 'string' && target[prop] !== undefined) return target[prop];
      
      return defaultString; 
    }
  };
  return new Proxy({}, handler);
};

const safeData = createSafeProxy();

const mockAxiosResponse = {
  data: safeData,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
};

export const disableBackendDependency = () => {
  axios.get = async () => mockAxiosResponse;
  axios.post = async () => mockAxiosResponse;
  axios.put = async () => mockAxiosResponse;
  axios.patch = async () => mockAxiosResponse;
  axios.delete = async () => mockAxiosResponse;
  axios.request = async () => mockAxiosResponse;
  axios.create = () => axios; // if they use axios.create()
};

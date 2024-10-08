export const baseUrl = "https://be-blog-kx24.onrender.com/v1";
// export const baseUrl = "http://localhost:8080/v1";

export function formatDate(timestamp: any) {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
}

export const userRole = {
  ADMIN: 1,
  USER: 2,
};

export const userStatus = {
  ACTIVE: 1,
  BANNED: 2,
};

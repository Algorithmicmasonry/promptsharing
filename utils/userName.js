
export function generateValidUsername(name) {
  const baseUsername = name.replace(/\s+/g, "").toLowerCase(); // Remove spaces and convert to lowercase
  return baseUsername.length < 8 ? baseUsername.padEnd(8, 'x') : baseUsername.substring(0, 20); // Adjust length to fit the validation
}

export async function createOrUpdateUser(profile, User) {
  const baseUsername = generateValidUsername(profile.name);
  let username = baseUsername;
  let userExists = await User.findOne({ username });

  // Handle uniqueness
  let counter = 1;
  while (userExists) {
    username = `${baseUsername}${counter}`;
    userExists = await User.findOne({ username });
    counter++;
  }

  await User.create({
    email: profile.email,
    username,
    image: profile.picture,
  });
}
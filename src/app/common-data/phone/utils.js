export function hasVerifiedPhoneNumber(phones = []) {
  return phones
    .some(phone => phone.isActive === true && phone.isVerified === true);
}

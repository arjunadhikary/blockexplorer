export const LINK_TYPE = {
  profile: '/profile/',
  block: '/block/',
  transaction: '/transaction/',
};
export const getLinkTypePartial = (linkType) => {
  console.log(linkType);

  return LINK_TYPE[linkType];
};

export const getDetails = ({ name, id, types, height, weight }) => {
  const strings = [`Name: ${name.toUpperCase()}`, `No. ${id}`];
  const typeNames = types
    .map((type) => {
      const string = type.type.name;
      return string.charAt(0).toUpperCase() + string.slice(1);
    })
    .join(', ');
  const typeString = `${types.length > 1 ? 'Types: ' : 'Type: '} ${typeNames}`;
  strings.push(
    typeString,
    `Height: ${Math.round(height * 3.93701)} in.`,
    `Weight: ${Math.round(weight * 0.220462)} lbs.`
  );
  return strings;
};

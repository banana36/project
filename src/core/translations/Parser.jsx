import React from "react";
import { B, A } from "../../components/typography";
import ParserUtility from "./libs";

const Parser = ({
  children,
  replace,
  onFirstAnchorPress,
  firstAnchorColor,
  onSecondAnchorPress,
  secondAnchorColor,
  capitalizeAll,
  upperCase,
  lowerCase,
  boldColor
}) => {
  if (!children) return `NO_REPLACE_FOUND`;
  let isFirstAnchorAlreadyAssigned = false;
  let isSecondAnchorAlreadyAssigned = false;
  let returnText = ParserUtility.getLabel(children, replace);
  if (capitalizeAll)
    returnText = ParserUtility.getRawLabel(returnText, "capitalizeAll");
  if (upperCase)
    returnText = ParserUtility.getRawLabel(returnText, "upperCase");
  if (lowerCase)
    returnText = ParserUtility.getRawLabel(returnText, "lowerCase");
  const boldTagRegex = /<\s*B[^>]*>(.*?)<\s*\/\s*B>/g;
  const anchorTagRegex = /<\s*A[^>]*>(.*?)<\s*\/\s*A>/g;
  const boldTagExpression = returnText.match(boldTagRegex);
  const anchorTagExpression = returnText.match(anchorTagRegex);
  const returnChildren = [];
  const replacedChildren = returnText
    .replace(boldTagRegex, "@-@-@_B_@-@-@")
    .replace(anchorTagRegex, "@-@-@_A_@-@-@")
    .split("@-@-@");
  replacedChildren
    .filter((filteredElement) => !!filteredElement)
    .forEach((element, index) => {
      if (element != "_B_" && element != "_A_") {
        returnChildren.push(element);
      } else if ((boldTagExpression?.length || 0) > 0 && element == "_B_") {
        const boldExpression = boldTagExpression[0]
          ?.replace("<B>", "")
          .replace("</B>", "");
        const el = React.createElement(
          B,
          { key: index, color: boldColor },
          boldExpression
        );
        returnChildren.push(el);
        boldTagExpression?.splice(0, 1);
      } else if ((anchorTagExpression?.length || 0) > 0 && element == "_A_") {
        const anchorExpression = anchorTagExpression[0]
          ?.replace("<A>", "")
          .replace("</A>", "");
        const el = React.createElement(
          A,
          {
            key: index,
            onPress: !isFirstAnchorAlreadyAssigned
              ? onFirstAnchorPress
              : !isSecondAnchorAlreadyAssigned
              ? onSecondAnchorPress
              : undefined,
            color: !isFirstAnchorAlreadyAssigned
              ? firstAnchorColor
              : !isSecondAnchorAlreadyAssigned
              ? secondAnchorColor
              : undefined
          },
          anchorExpression
        );
        if (isFirstAnchorAlreadyAssigned) isSecondAnchorAlreadyAssigned = true;
        isFirstAnchorAlreadyAssigned = true;
        returnChildren.push(el);
        anchorTagExpression?.splice(0, 1);
      }
    });
  return returnChildren;
};

export default Parser;

import { Button, Flex, View } from "@adobe/react-spectrum";
import { appConfig } from "../config";
import { useMemo } from "react";

export type PaginationProps = {
  total: number;
  page: number;
  limit: number;
  onPageChanged: (page: number) => void;
};

export function Pagination({
  limit,
  page,
  total,
  onPageChanged,
}: PaginationProps) {
  const numberOfPages = Math.ceil(total / limit);

  // amount of buttons
  const paginationReach =
    numberOfPages > appConfig.paginationReachLimit
      ? appConfig.paginationReachLimit
      : numberOfPages;

  // position of the selected button
  const middleOfTheReach = Math.ceil(paginationReach / 2);

  let currentPagePosition = middleOfTheReach;
  if (page < middleOfTheReach) {
    currentPagePosition = page;
  }
  if (page > numberOfPages - middleOfTheReach) {
    currentPagePosition = paginationReach - (numberOfPages % page);
  }

  const pages = [];
  for (let i = 1; i <= paginationReach; i++) {
    const currentPage = page - currentPagePosition + i;
    pages.push({
      id: currentPage,
      isSelected: page === currentPage,
    });
  }

  return (
    <View paddingY={"size-200"}>
      <Flex direction="row" gap="size-150" wrap>
        {pages.map((page) => (
          <Button
            variant={page.isSelected ? "accent" : "primary"}
            key={page.id}
            onPress={() => onPageChanged(page.id)}
          >
            {page.id}
          </Button>
        ))}
      </Flex>
    </View>
  );
}

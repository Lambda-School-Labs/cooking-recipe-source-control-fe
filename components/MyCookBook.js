import React, { useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import { cookbookHeaderOptions } from "./header/navigationHeader";
import styles from "../styles/recipe-styles";
import { getAllCookbookRecipes } from "../store/cookbook/cookbookAction";
import { useDispatch, useSelector } from "react-redux";
import Recipe from "./Recipe";
import FancySpinner from "./FancySpinner";

const MyCookBook = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.cookbook.isLoading);
    const allCookbookRecipes = useSelector(
        state => state.cookbook.entireCookbook,
    );

    useEffect(() => {
        dispatch(getAllCookbookRecipes());
    }, [dispatch, getAllCookbookRecipes]);

    const getAllCategories = allRecipes => {
        let categoryList = [];
        if (allRecipes) {
            allRecipes.forEach((recipe, _) => {
                if (recipe.tags && recipe.tags[0]) {
                    if (!categoryList.includes(recipe.tags[0].name)) {
                        categoryList = [...categoryList, recipe.tags[0].name];
                    }
                }
            });
        }
        return categoryList;
    };

    if (loading) {
        return <FancySpinner />;
    } else {
        const categories = getAllCategories(allCookbookRecipes);
        return (
            <View style={{ maxWidth: "90%", marginLeft: "5%" }}>
                <ScrollView style={{ paddingBottom: "10%" }}>
                    {categories.map(tag => {
                        return (
                            <View key={tag}>
                                <Text style={styles.heading}>{tag}</Text>
                                {allCookbookRecipes
                                    .filter(recipeToFilter => {
                                        return (
                                            recipeToFilter.tags[0].name === tag
                                        );
                                    })
                                    .map(filteredRecipe => {
                                        const id = filteredRecipe.id;
                                        const tag = filteredRecipe.tags[0].name;
                                        return (
                                            <Recipe
                                                key={`${id}.${tag}`}
                                                recipe={filteredRecipe}
                                                parent={"Cookbook"}
                                            />
                                        );
                                    })}
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
};

export default MyCookBook;

MyCookBook.navigationOptions = cookbookHeaderOptions;

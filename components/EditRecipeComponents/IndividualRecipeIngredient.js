import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput } from "react-native";

import styles from "../../styles/individualRecipeStyles";
import { Swipeable } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import {
    startEdit,
    editIngred,
    stopEdit,
} from "../../store/singleRecipe/singleRecipeActions";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const IndividualRecipeIngredient = ({ index, color }) => {
    const dispatch = useDispatch();
    const mainEditing = useSelector(state => state.singleRecipe.editing);
    const ingredients = useSelector(
        state => state.singleRecipe.recipe.ingredients,
    );
    const recipeIng =
        ingredients && ingredients[index] ? ingredients[index] : {};
    const [editing, setEditing] = useState(false);

    const swipeableEl = useRef(null);

    const editHandler = () => {
        setEditing(true);
        dispatch(startEdit());
        swipeableEl.current.close();
    };

    useEffect(() => {
        // If our mainEditing variable is false,
        // setEditing to false as well.
        // This makes sure that this individual component doesn't also
        //     enter edit mode if we start editing a different swipeale
        if (!mainEditing) {
            setEditing(false);
        }
    }, [mainEditing]);

    return (
        <View style={styles.swipeableContainer}>
            <Swipeable
                ref={swipeableEl}
                renderRightActions={() => (
                    <View style={styles.buttonContainer}>
                        <View style={styles.editButton}>
                            <FontAwesome
                                name="pencil-square-o"
                                size={20}
                                color="white"
                                style={styles.icon}
                                onPress={editHandler}
                            />
                        </View>
                        <View style={styles.deleteButton}>
                            <FontAwesome
                                name="trash-o"
                                size={20}
                                color="white"
                                style={styles.icon}
                                onPress={() => {}}
                            />
                        </View>
                    </View>
                )}
            >
                {/*Text Input*/}
                {editing && mainEditing ? (
                    <View style={styles.ingredientContainer}>
                        <TextInput
                            value={recipeIng.name}
                            onChangeText={name =>
                                dispatch(
                                    editIngred(index, {
                                        ...recipeIng,
                                        name,
                                    }),
                                )
                            }
                            style={styles.input}
                            returnKeyType="done"
                            autoFocus={true}
                            enablesReturnKeyAutomatically={true}
                            onSubmitEditing={() => {
                                dispatch(stopEdit());
                            }}
                        />

                        <TextInput
                            keyboardType="decimal-pad"
                            returnKeyType="done"
                            value={String(recipeIng.quantity)}
                            onChangeText={qty =>
                                dispatch(
                                    editIngred(index, {
                                        ...recipeIng,
                                        // If our quantity isn't a number, it'll turn into NaN! Danger!
                                        quantity: isNaN(Number(qty))
                                            ? recipeIng.quantity
                                            : qty,
                                    }),
                                )
                            }
                            style={styles.input}
                            onSubmitEditing={() => {
                                dispatch(stopEdit());
                            }}
                        />
                        <TextInput
                            value={recipeIng.unit}
                            onChangeText={unit =>
                                dispatch(
                                    editIngred(index, {
                                        ...recipeIng,
                                        unit: unit,
                                    }),
                                )
                            }
                            style={styles.input}
                            returnKeyType="done"
                            onSubmitEditing={() => {
                                dispatch(stopEdit());
                            }}
                        />
                    </View>
                ) : (
                    <View
                        style={
                            color.active.includes("Instructions")
                                ? styles.hidden
                                : styles.ingredientList
                        }
                    >
                        <View style={styles.ingredientView}>
                            <Text style={styles.ingredientText}>
                                {recipeIng.quantity} {recipeIng.unit}
                            </Text>
                            <MaterialCommunityIcons
                                name="drag-vertical"
                                size={32}
                                color="#2E2E2E"
                            />
                        </View>
                        <View style={styles.ingredientView}>
                            <Text style={styles.ingredientText}>
                                {recipeIng.name}
                            </Text>
                        </View>
                    </View>
                )}
            </Swipeable>
        </View>
    );
};

export default IndividualRecipeIngredient;

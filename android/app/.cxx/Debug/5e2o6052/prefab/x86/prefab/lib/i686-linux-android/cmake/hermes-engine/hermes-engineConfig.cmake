if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/sndigitechpvtltd/.gradle/caches/8.10.2/transforms/0638fe2e846f1991602d74775e28a850/transformed/hermes-android-0.76.5-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/sndigitechpvtltd/.gradle/caches/8.10.2/transforms/0638fe2e846f1991602d74775e28a850/transformed/hermes-android-0.76.5-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()


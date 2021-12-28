(function () {
  const _toArray = (domCollection) => {
    return Array.prototype.slice.call(domCollection);
  };

  const _sellingPlanInput = document.getElementById(
    "mikawaya-hidden-selling-plan-id"
  );
  const _setSelectedSellingPlanId = (id) => {
    _sellingPlanInput.value = id;
    _toArray(
      document.getElementsByClassName("mikawaya-selling-plan-radio-button")
    ).forEach((el) => {
      if (el.value === id) {
        el.checked = true;
      } else {
        el.checked = false;
      }
    });
  };

  const _getSelectedSellingPlanGroupId = () => {
    return _toArray(document.getElementsByName("purchase_option")).find(
      (el) => el.checked
    ).value;
  };

  const _getSelectedSellingPlanId = (groupId) => {
    // If one-time purchase is selected, then return that.
    const selectEl = _toArray(
      document.getElementsByName("select-selling-plan")
    ).find(({ dataset }) => dataset.groupId === groupId);
    return selectEl.value;
  };

  const v5sellingPlanGroupsContainer = document.getElementById(
    "mikawaya-selling-plan-groups-container-v5"
  );

  const v5DescriptionEl = document.getElementById(
    "mikawaya-product-page-widget-container-v5-description"
  );

  const _groupEls = _toArray(
    document.getElementsByName("selling-plan-group-container")
  );

  const _firstGropuEl = _groupEls.find(
    ({ dataset }) => dataset.groupIndex == 0
  );

  const _changePathElCssToSelected = (el) => {
    el.classList.remove("input-label");
    el.classList.add("input-label__selected");
  };

  const _changePathElCssToUnselected = (el) => {
    el.classList.add("input-label");
    el.classList.remove("input-label__selected");
  };

  const _subscriptionSvgEl = document.getElementById("subscription-svg");
  const _oneTimeSvgEl = document.getElementById("one-time-svg");
  const _oneTimePurchaseOptionLabel = document.getElementById(
    "one-time-purchase-option-label"
  );
  const _subscriptionPurchaseOptionLabel = document.getElementById(
    "subscription-purchase-option-label"
  );
  const _oneTimePurchaseTextEl = document.getElementById(
    "one-time-purchase-text"
  );
  const _subscriptionPurchaseTextEl = document.getElementById(
    "subscription-purchase-text"
  );
  const _oneTimeSelectedEl = document.getElementById(
    "mikawaya-one-time-selected-svg"
  );
  const _subscriptionSelectedEl = document.getElementById(
    "mikawaya-subscription-selected-svg"
  );
  const v5PriceEl = document.getElementById(
    "mikawaya-product-page-widget-container-v5-price"
  );

  const _renderOneTimeOptionAsSelected = () => {
    _toArray(_subscriptionSvgEl.children).forEach(_changePathElCssToUnselected);
    _subscriptionPurchaseTextEl.style.color = "#000";
    _oneTimePurchaseTextEl.style.color = "#eb6860";
    _toArray(_oneTimeSvgEl.children).forEach(_changePathElCssToSelected);
    _oneTimePurchaseOptionLabel.classList.add(
      "mikawaya-purchase-option-label__selected"
    );
    _oneTimePurchaseOptionLabel.classList.remove(
      "mikawaya-purchase-option-label"
    );
    _subscriptionPurchaseOptionLabel.classList.add(
      "mikawaya-purchase-option-label"
    );
    _subscriptionPurchaseOptionLabel.classList.remove(
      "mikawaya-purchase-option-label__selected"
    );
    _oneTimeSelectedEl.classList.remove("mikawaya-hidden");
    _subscriptionSelectedEl.classList.add("mikawaya-hidden");
  };

  const _renderSubscriptionOptionAsSelected = () => {
    _toArray(_subscriptionSvgEl.children).forEach(_changePathElCssToSelected);
    _toArray(_oneTimeSvgEl.children).forEach(_changePathElCssToUnselected);

    _subscriptionPurchaseTextEl.style.color = "#eb6860";
    _oneTimePurchaseTextEl.style.color = "#000";

    _oneTimePurchaseOptionLabel.classList.remove(
      "mikawaya-purchase-option-label__selected"
    );
    _oneTimePurchaseOptionLabel.classList.add("mikawaya-purchase-option-label");
    _subscriptionPurchaseOptionLabel.classList.remove(
      "mikawaya-purchase-option-label"
    );
    _subscriptionPurchaseOptionLabel.classList.add(
      "mikawaya-purchase-option-label__selected"
    );
    _oneTimeSelectedEl.classList.add("mikawaya-hidden");
    _subscriptionSelectedEl.classList.remove("mikawaya-hidden");
  };

  const _handleSellingPlanGroupChange = (groupId) => {
    if (groupId === "one-time") {
      _renderOneTimeOptionAsSelected();
    } else {
      _renderSubscriptionOptionAsSelected();
    }

    if (groupId === "one-time") {
      _checkGroupInput(groupId);
      v5sellingPlanGroupsContainer.classList.add("mikawaya-hidden");
      _handleSellingPlanChange("");
    } else {
      _checkGroupInput(groupId);
      v5sellingPlanGroupsContainer.classList.remove("mikawaya-hidden");
      _handleSellingPlanChange(_getSelectedSellingPlanId(groupId));
    }
  };

  const _groupVariantAllocation = _toArray(
    document.getElementsByName("variant-group-allocation")
  ).map(({ dataset }) => dataset);

  const _checkGroupInput = (groupId) => {
    _toArray(document.getElementsByName("purchase_option")).find(
      ({ value }) => value === groupId
    ).checked = true;
  };

  const _handleVariantChange = (selectedVariantId) => {
    const variantSellingPlanGroupIds = [
      ...new Set(
        _groupVariantAllocation
          .filter(({ variantId }) => variantId == selectedVariantId)
          .map(({ groupId }) => groupId)
      ),
    ];

    const selectedSellingPlanGroupId = _getSelectedSellingPlanGroupId();
    if (selectedSellingPlanGroupId === "one-time") {
      _handleSellingPlanGroupChange("one-time");
    } else {
      const selectedGroupEl = _toArray(
        document.getElementsByName("selling-plan-group-container")
      ).find((el) => el.dataset.groupId === selectedSellingPlanGroupId);
      const { groupIndex } = selectedGroupEl.dataset;
      const groupIdToCheck = variantSellingPlanGroupIds[parseInt(groupIndex)];
      _handleSellingPlanGroupChange(groupIdToCheck);
    }

    _renderInlinePrices(selectedVariantId);
  };

  const _getCurrentVariantId = () => {
    const queryParams = new URLSearchParams(location.search);
    return (
      queryParams.get("variant") ||
      document.getElementById("current-variant-id").dataset.variantId
    );
  };

  const _listenToVariantChange = () => {
    let currentVariantId = _getCurrentVariantId();

    setInterval(() => {
      const splitQueryString = location.search.split("&");
      const variantKeyIndex = splitQueryString.findIndex((str) =>
        str.includes("variant")
      );
      if (variantKeyIndex === -1) {
        return;
      }
      const queryVariantId = splitQueryString[variantKeyIndex].split("=")[1];

      if (currentVariantId !== queryVariantId) {
        currentVariantId = queryVariantId;
        _handleVariantChange(queryVariantId);
      }
    }, 10);
  };

  const _renderInlinePrices = (variantId) => {
    const currentSellingPlanGroupId = _getSelectedSellingPlanGroupId();

    const newPrice =
      currentSellingPlanGroupId === "one-time"
        ? _toArray(document.getElementsByName("one-time-variant-price")).find(
            (el) => variantId === el.dataset.variantId
          ).innerHTML
        : _groupVariantAllocation
            .filter((dataset) => dataset.variantId === variantId)
            .find((dataset) => {
              const currentSellingPlanId = _getSelectedSellingPlanId(
                dataset.groupId
              );
              return (
                dataset.groupId === currentSellingPlanGroupId &&
                dataset.sellingPlanId === currentSellingPlanId
              );
            }).sellingPlanAllocationPrice;

    v5PriceEl.innerHTML = newPrice;
  };

  const _initGroupsRedner = () => {
    _handleSellingPlanGroupChange("one-time");
    const initVariantId =
      document.getElementById("current-variant-id").dataset.variantId;
    _handleVariantChange(initVariantId);
  };

  const _renderSellingPlanDescription = (sellingPlanId) => {
    const descriptionEls = _toArray(
      document.getElementsByName("selling-plan-description")
    );

    const targetDescriptionEl = descriptionEls.find(
      ({ dataset }) => dataset.sellingPlanId === sellingPlanId
    );

    v5DescriptionEl.innerHTML = targetDescriptionEl.innerHTML;
  };

  const _renderContainer = () => {
    document
      .getElementById("mikawaya-product-page-widget-container")
      .classList.remove("mikawaya-hidden");
  };

  const _handleSellingPlanChange = (sellingPlanId) => {
    if (sellingPlanId === "") {
      v5DescriptionEl.innerHTML = "";
    } else {
      _renderSellingPlanDescription(sellingPlanId);
    }

    _setSelectedSellingPlanId(sellingPlanId);
    _renderInlinePrices(_getCurrentVariantId());
  };

  const handleSellingPlanChange = ({ target }) => {
    const sellingPlanId = target.value;
    _handleSellingPlanChange(sellingPlanId);
  };

  const handleSellingPlanGroupChange = ({ target }) => {
    const groupId =
      target.value === "subscription"
        ? _firstGropuEl.dataset.groupId
        : target.value;
    _handleSellingPlanGroupChange(groupId);
  };

  _initGroupsRedner();
  _renderContainer();
  _listenToVariantChange();

  window.MIKAWAYA = {
    handleSellingPlanGroupChange,
    handleSellingPlanChange,
  };
})();

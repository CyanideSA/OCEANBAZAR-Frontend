export function getCurrentUserType() {
  try {
    const user = JSON.parse(localStorage.getItem("oceanBazarUser") || "{}");
    const value = String(user?.userType || user?.role || "retail").toLowerCase();
    return value === "wholesale" ? "wholesale" : "retail";
  } catch {
    return "retail";
  }
}

function toNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function normalizeDiscountPct(tier) {
  if (!tier) return 0;
  let pct = toNumber(tier.discountPct, NaN);
  if (!Number.isFinite(pct)) pct = toNumber(tier.discountPercent, NaN);
  if (!Number.isFinite(pct)) pct = toNumber(tier.discount, 0);
  if (pct > 1) pct = pct / 100;
  return Math.max(0, pct);
}

function findMatchingTier(discountTiers, quantity) {
  const q = Math.max(1, toNumber(quantity, 1));
  const tiers = Array.isArray(discountTiers) ? discountTiers : [];
  return tiers.find((tier) => {
    const min = toNumber(tier?.minQty, 1);
    const maxRaw = tier?.maxQty;
    const max = maxRaw === null || maxRaw === undefined || String(maxRaw).trim?.() === ""
      ? null
      : toNumber(maxRaw, null);
    return q >= min && (max === null || q <= max);
  });
}

export function getDisplayPrices(product, userType = "retail", quantity = 1) {
  const retailBase = toNumber(product?.retailPrice, toNumber(product?.price, 0));
  const wholesaleBase = toNumber(product?.wholesalePrice, retailBase);
  const tier = findMatchingTier(product?.discountTiers, quantity);
  const discountPct = normalizeDiscountPct(tier);

  const isWholesale = String(userType || "").toLowerCase() === "wholesale";
  const selectedBase = isWholesale ? wholesaleBase : retailBase;
  const unitPrice = selectedBase * (1 - discountPct);

  return {
    retailBase,
    wholesaleBase,
    unitPrice,
    discountPct,
    strikeRetailForWholesale: isWholesale && retailBase > unitPrice,
  };
}

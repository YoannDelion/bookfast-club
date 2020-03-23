<?php

namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Book;
use App\Entity\Score;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;

/**
 * Class CurrentUserExtension
 *
 * Filtre les données récupérées pour correspondre à l'utilisateur courant
 *
 * @package App\Doctrine
 */
class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    /**
     * @var Security
     */
    private $security;

    private $auth;

    /**
     * CurrentUserExtension constructor.
     * @param Security $security
     */
    public function __construct(Security $security, AuthorizationCheckerInterface $auth)
    {
        $this->security = $security;
        $this->auth = $auth;
    }

    /**
     * @param QueryBuilder $queryBuilder
     * @param string $resourceClass
     */
    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass)
    {
        $user = $this->security->getUser();

        if (($resourceClass === Score::class || $resourceClass === Book::class) && !$this->auth->isGranted('ROLE_ADMIN') && $user instanceof User) {
            $rootAlias = $queryBuilder->getRootAliases()[0];

            $queryBuilder->andWhere("$rootAlias.user = :user")
                ->setParameter('user', $user);
        }
    }

    /**
     * @param QueryBuilder $queryBuilder
     * @param QueryNameGeneratorInterface $queryNameGenerator
     * @param string $resourceClass
     * @param string|null $operationName
     */
    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    /**
     * @param QueryBuilder $queryBuilder
     * @param QueryNameGeneratorInterface $queryNameGenerator
     * @param string $resourceClass
     * @param array $identifiers
     * @param string|null $operationName
     * @param array $context
     */
    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = [])
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }
}